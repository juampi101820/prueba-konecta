const request = require('supertest');
const express = require('express');
const bodyParser = require('express').json;

const empleadoRoutes = require('../../../src/interfaces/routes/empleadoRoutes');
const sequelize = require('../../../src/config/database');
const Empleado = require('../../../src/infrastructure/models/Empleado');

const app = express();
app.use(bodyParser());
app.use('/api/empleados', empleadoRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Rutas de empleados', () => {
  test('POST /api/empleados — crea un empleado correctamente', async () => {
    const nuevo = {
      nombre: 'Juan marin',
      fecha_ingreso: '2025-07-30',
      salario: 3200000
    };
    const res = await request(app)
      .post('/api/empleados')
      .send(nuevo);

    expect(res.status).toBe(201);
    expect(res.body.nombre).toBe(nuevo.nombre);
    expect(res.body.fecha_ingreso).toBe(nuevo.fecha_ingreso);
    expect(Number(res.body.salario)).toBe(nuevo.salario);
    expect(res.body.id).toBeDefined();
  });

  test('GET /api/empleados — devuelve empleados con paginacion', async () => {
    await Empleado.create({ nombre: 'Juan pablo marin', fecha_ingreso: '2025-07-30', salario: 2500000 });
    await Empleado.create({ nombre: 'Marleny cifuentes', fecha_ingreso: '2025-07-30', salario: 4200000 });

    const res = await request(app)
      .get('/api/empleados?pagina=1&limite=2');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeLessThanOrEqual(2);
    expect(res.body).toHaveProperty('pagina', 1);
    expect(res.body).toHaveProperty('limite', 2);
    expect(res.body).toHaveProperty('total');
    res.body.data.forEach(e => {
      expect(!isNaN(Number(e.salario))).toBe(true);
    });
  });

  test('POST /api/empleados — rechaza datos inválidos', async () => {
    const res = await request(app)
      .post('/api/empleados')
      .send({ nombre: 'A', fecha_ingreso: 'fecha_mal', salario: 'no-numero' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errores');
    expect(Array.isArray(res.body.errores)).toBe(true);
  });

  test('POST /api/empleados — rechaza fecha futura', async () => {
    const fechaFutura = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const res = await request(app)
      .post('/api/empleados')
      .send({
        nombre: 'Empleado Futuro',
        fecha_ingreso: fechaFutura,
        salario: 12345
      });

    expect(res.status).toBe(400);
    expect(res.body.errores.some(e => e.msg.includes('fecha de ingreso no puede'))).toBe(true);
  });
});