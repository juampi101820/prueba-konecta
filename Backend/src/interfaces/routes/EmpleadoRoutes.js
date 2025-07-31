const express = require('express');
const router = express.Router();

const validarEmpleado = require('../middlewares/validacionEmpleado');
const EmpleadoController = require('../controllers/EmpleadoController');

// rutas
router.post('/', validarEmpleado, EmpleadoController.crear);
router.get('/', EmpleadoController.listar);


module.exports = router;
