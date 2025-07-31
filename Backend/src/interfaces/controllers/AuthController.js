const AuthService = require('../../application/services/AuthService');
const UsuarioYaExisteError = require('../../domain/errors/UsuarioYaExisteError');
const RolInexistenteError = require('../../domain/errors/RolInexistenteError');
const CredencialesIncorrectasError = require('../../domain/errors/CredencialesIncorrectasError');

const register = async (req, res) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof UsuarioYaExisteError) {
      res.status(409).json({ mensaje: error.message });
    } else if (error instanceof RolInexistenteError) {
      res.status(400).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }
};

const login = async (req, res) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof CredencialesIncorrectasError) {
      res.status(401).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }
};

module.exports = { register, login };
