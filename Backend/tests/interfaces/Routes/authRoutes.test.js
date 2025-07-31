const request = require('supertest');
const express = require('express');
const bodyParser = require('express').json;

const { register } = require('../../../src/interfaces/controllers/AuthController');
const validacionRegistro = require('../../../src/interfaces/middlewares/ValidacionRegistro');

// Crea una app express solo para el test
const app = express();
app.use(bodyParser());
app.post('/register', validacionRegistro, register);

// Mock del AuthService para aislar el test de validacion
jest.mock('../../../src/application/services/AuthService', () => ({
  register: jest.fn().mockResolvedValue({ usuario: 'mock', correo: 'mock@correo.com' })
}));

describe('validacion de registro', () => {
  test('rechaza usuario muy corto', async () => {
    const res = await request(app)
      .post('/register')
      .send({ usuario: 'ab', correo: 'a@b.com', contrasena: 'Qwerty123!', id_rol: 1 });
    expect(res.status).toBe(400);
    expect(res.body.errores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'usuario' })
      ])
    );
  });

  test('rechaza correo invalido', async () => {
    const res = await request(app)
      .post('/register')
      .send({ usuario: 'usuarioOK', correo: 'correo_mal', contrasena: 'Qwerty123!', id_rol: 1 });
    expect(res.status).toBe(400);
    expect(res.body.errores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'correo' })
      ])
    );
  });

  test('rechaza contraseña insegura', async () => {
    const res = await request(app)
      .post('/register')
      .send({ usuario: 'usuarioOK', correo: 'ok@correo.com', contrasena: '12345678', id_rol: 1 });
    expect(res.status).toBe(400);
    expect(res.body.errores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'contrasena' })
      ])
    );
  });

  test('rechaza si no envía id_rol', async () => {
    const res = await request(app)
      .post('/register')
      .send({ usuario: 'Valido123', correo: 'valido@correo.com', contrasena: 'Qwerty123!' }); // sin id_rol
    expect(res.status).toBe(400);
    expect(res.body.errores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'id_rol' })
      ])
    );
  });

  test('acepta registro valido', async () => {
    const res = await request(app)
      .post('/register')
      .send({ usuario: 'Valido123', correo: 'valido@correo.com', contrasena: 'Qwerty123!', id_rol: 1 });
    expect(res.status).toBe(201);
    expect(res.body.usuario).toBe('mock');
  });
});