const sequelize = require('../../../src/config/database');
const { Usuario, Rol } = require('../../../src/infrastructure/models');
const AuthService = require('../../../src/application/services/AuthService');

const UsuarioYaExisteError = require('../../../src/domain/errors/UsuarioYaExisteError');
const RolInexistenteError = require('../../../src/domain/errors/RolInexistenteError');
const CredencialesIncorrectasError = require('../../../src/domain/errors/CredencialesIncorrectasError');

let rolEmpleado;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  rolEmpleado = await Rol.create({ nombre: 'EMPLEADO' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('AuthService', () => {
  test('register - crea usuario exitosamente', async () => {
    const data = {
      usuario: 'usuarioprueba',
      correo: 'prueba@gmail.com',
      contrasena: 'pass12345',
      id_rol: rolEmpleado.id
    };
    const result = await AuthService.register(data);
    expect(result.usuario).toBe('usuarioprueba');
    expect(result.correo).toBe('prueba@gmail.com');

    const usuarioBD = await Usuario.findOne({ where: { usuario: 'usuarioprueba' } });
    expect(usuarioBD).not.toBeNull();
    expect(usuarioBD.contrasena).not.toBe('pass12345');
  });

  test('register - falla si el usuario ya existe', async () => {
    const data = {
      usuario: 'usuarioprueba',
      correo: 'otro@test.com',
      contrasena: 'pass',
      id_rol: rolEmpleado.id
    };
    await expect(AuthService.register(data)).rejects.toThrow(UsuarioYaExisteError);
  });

  test('register - falla si el rol no existe', async () => {
    const data = {
      usuario: 'otroUsuario',
      correo: 'otro@correo.com',
      contrasena: 'pass12345',
      id_rol: 9999
    };
    await expect(AuthService.register(data)).rejects.toThrow(RolInexistenteError);

    const usuarioBD = await Usuario.findOne({ where: { usuario: 'otroUsuario' } });
    expect(usuarioBD).toBeNull();
  });

  test('login - bien con credenciales correctas', async () => {
    const data = { usuario: 'usuarioprueba', contrasena: 'pass12345' };
    const result = await AuthService.login(data);
    expect(result.token).toBeDefined();
  });

  test('login - error con usuario incorrecto', async () => {
    const data = { usuario: 'noexiste', contrasena: 'pass12345' };
    await expect(AuthService.login(data)).rejects.toThrow(CredencialesIncorrectasError);
  });

  test('login - error con contraseña incorrecta', async () => {
    const data = { usuario: 'usuarioprueba', contrasena: 'incorrecta' };
    await expect(AuthService.login(data)).rejects.toThrow(CredencialesIncorrectasError);
  });
});