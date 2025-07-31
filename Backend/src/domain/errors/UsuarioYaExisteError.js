class UsuarioYaExisteError extends Error {
  constructor(message  = 'El usuario ya existe') {
    super(message);
    this.name = 'UsuarioYaExisteError';
  }
}
module.exports = UsuarioYaExisteError;