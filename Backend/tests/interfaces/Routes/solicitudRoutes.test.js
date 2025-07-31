// Mocks para los middlewares de autenticación y roles
jest.mock('../../../src/interfaces/middlewares/authMiddleware', () => (req, res, next) => {
  req.user = { id: 1, roles: ['ADMINISTRADOR', 'EMPLEADO'] };
  next();
});
jest.mock('../../../src/interfaces/middlewares/authorizeRoles', () => (...roles) => (req, res, next) => {
  next();
});

const request = require('supertest');
const express = require('express');
const bodyParser = require('express').json;

const solicitudRoutes = require('../../../src/interfaces/routes/solicitudRoutes');
const empleadoRoutes = require('../../../src/interfaces/routes/empleadoRoutes');
const sequelize = require('../../../src/config/database');
const Empleado = require('../../../src/infrastructure/models/Empleado');
const Solicitud = require('../../../src/infrastructure/models/Solicitud');

const app = express();
app.use(bodyParser());
app.use('/api/empleados', empleadoRoutes); 
app.use('/api/solicitudes', solicitudRoutes);

let empleadoCreado;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  empleadoCreado = await Empleado.create({
    nombre: 'Empleado Test',
    fecha_ingreso: '2024-01-01',
    salario: 2500000
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Rutas de solicitudes', () => {
  test('POST /api/solicitudes — crea una solicitud correctamente', async () => {
    const nueva = {
      id_empleado: empleadoCreado.id,
      fecha: '2024-08-01',
      tipo: 'VACACIONES',
      descripcion: 'Vacaciones anuales'
    };
    const res = await request(app)
      .post('/api/solicitudes')
      .send(nueva);

    expect(res.status).toBe(201);
    expect(res.body.tipo).toBe(nueva.tipo);
    expect(res.body.id_empleado).toBe(nueva.id_empleado);
    expect(res.body.descripcion).toBe(nueva.descripcion);
    expect(res.body.id).toBeDefined();
  });

  test('POST /api/solicitudes — rechaza si el empleado no existe', async () => {
    const res = await request(app)
      .post('/api/solicitudes')
      .send({
        id_empleado: 99999,
        fecha: '2024-08-01',
        tipo: 'PERMISO',
        descripcion: 'Prueba'
      });

    expect(res.status).toBe(400);
    expect(res.body.errores.some(e => e.msg === 'El empleado no existe')).toBe(true);
  });

  test('POST /api/solicitudes — rechaza datos inválidos', async () => {
    const res = await request(app)
      .post('/api/solicitudes')
      .send({
        id_empleado: empleadoCreado.id,
        fecha: 'fecha_mal',
        tipo: 'AB',
        descripcion: ''
      });

    expect(res.status).toBe(400);
    expect(res.body.errores).toBeDefined();
  });

  test('GET /api/solicitudes — devuelve solicitudes con paginacion', async () => {
    await Solicitud.create({ id_empleado: empleadoCreado.id, fecha: '2024-07-15', tipo: 'PERMISO', descripcion: 'Permiso 1' });
    await Solicitud.create({ id_empleado: empleadoCreado.id, fecha: '2024-07-16', tipo: 'VACACIONES', descripcion: 'Vacaciones 2' });

    const res = await request(app)
      .get('/api/solicitudes?pagina=1&limite=2');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeLessThanOrEqual(2);
    expect(res.body).toHaveProperty('pagina', 1);
    expect(res.body).toHaveProperty('limite', 2);
    expect(res.body).toHaveProperty('total');
  });

  test('DELETE /api/solicitudes/:id — elimina una solicitud (solo admin)', async () => {
    const sol = await Solicitud.create({
      id_empleado: empleadoCreado.id,
      fecha: '2024-07-20',
      tipo: 'PERMISO',
      descripcion: 'Para borrar'
    });

    const res = await request(app)
      .delete(`/api/solicitudes/${sol.id}`)
      .send();

    expect(res.status).toBe(204);
    const eliminado = await Solicitud.findByPk(sol.id);
    expect(eliminado).toBeNull();
  });
});
