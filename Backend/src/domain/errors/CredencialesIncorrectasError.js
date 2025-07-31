class CredencialesIncorrectasError extends Error {
  constructor(message = 'Credenciales incorrectas') {
    super(message);
    this.name = 'CredencialesIncorrectasError';
  }
}
module.exports = CredencialesIncorrectasError;
