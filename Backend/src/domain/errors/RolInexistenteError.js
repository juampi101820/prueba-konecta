class RolInexistenteError extends Error {
  constructor(message  = 'El rol no existe') {
    super(message);
    this.name = 'RolInexistenteError';
  }
}
module.exports = RolInexistenteError;
