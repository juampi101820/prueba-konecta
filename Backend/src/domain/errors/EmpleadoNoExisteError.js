class EmpleadoNoExisteError extends Error {
  constructor(message = 'El empleado no existe') {
    super(message);
    this.name = 'EmpleadoNoExisteError';
  }
}
module.exports = EmpleadoNoExisteError;
