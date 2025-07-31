const { body, validationResult } = require('express-validator');

const validacionEmpleado = [
    body('nombre')
        .isString().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('fecha_ingreso')
        .isISO8601().withMessage('La fecha de ingreso debe ser valida (YYYY-MM-DD)')
        .custom((value) => {
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            const fecha = new Date(value);
            fecha.setHours(0, 0, 0, 0);
            if (fecha > hoy) {
                throw new Error('La fecha de ingreso no puede ser posterior a hoy');
            }
            return true;
        }),
    body('salario')
        .isNumeric().withMessage('El salario debe ser numerico'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }
        next();
    }
];

module.exports = validacionEmpleado;
