const express = require('express');
const router = express.Router();

const validarEmpleado = require('../middlewares/validacionEmpleado');
const EmpleadoController = require('../controllers/EmpleadoController');
const authMiddleware = require('../middlewares/authMiddleware');

// rutas
router.post('/', authMiddleware, validarEmpleado, EmpleadoController.crear);
router.get('/', authMiddleware, EmpleadoController.listar);


module.exports = router;
