const { body, validationResult } = require('express-validator');
const { Empleado } = require('../../infrastructure/models');
const EmpleadoNoExisteError = require('../../domain/errors/EmpleadoNoExisteError');

const validacionSolicitud = [
  body('id_empleado')
    .isInt({ min: 1 }).withMessage('Debe indicar un empleado valid')
    .custom(async value => {
      const empleado = await Empleado.findByPk(value);
      if (!empleado) {
        throw new EmpleadoNoExisteError();
      }
      return true;
    }),
  body('fecha')
    .isISO8601().withMessage('La fecha es obligatoria y debe ser valida (YYYY-MM-DD)'),
  body('tipo')
    .isString().isLength({ min: 3, max: 50 }).withMessage('El tipo es obligatorio (3-50 caracteres).'),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];

module.exports = validacionSolicitud;
