class UsuarioOCorreoObligatorioError extends Error {
  constructor(message  = 'Usuario o correo obligatorio') {
    super(message);
    this.name = 'UsuarioOCorreoObligatorioError';
  }
}
module.exports = UsuarioOCorreoObligatorioError;
