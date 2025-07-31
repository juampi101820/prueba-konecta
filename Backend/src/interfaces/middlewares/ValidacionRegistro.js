const { body, validationResult } = require('express-validator');

const ValidacionRegistro = [
  body('usuario')
    .isLength({ min: 4, max: 20 })
    .withMessage('El usuario debe tener entre 4 y 20 caracteres.')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('El usuario solo puede contener letras, números y guión bajo.'),

  body('correo')
    .isEmail()
    .withMessage('Debe ingresar un correo electrónico válido.'),

  body('contrasena')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres.')
    .matches(/[a-z]/)
    .withMessage('La contraseña debe tener al menos una minúscula.')
    .matches(/[A-Z]/)
    .withMessage('La contraseña debe tener al menos una mayúscula.')
    .matches(/[0-9]/)
    .withMessage('La contraseña debe tener al menos un número.')
    .matches(/[\W_]/)
    .withMessage('La contraseña debe tener al menos un caracter especial.'),

  body('id_rol')
    .exists().withMessage('El id_rol es obligatorio.')
    .bail()
    .isInt({ min: 1 }).withMessage('El id_rol debe ser un número entero positivo.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];

module.exports = ValidacionRegistro;
