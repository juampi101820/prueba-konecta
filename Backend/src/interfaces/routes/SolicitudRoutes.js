const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const SolicitudController = require('../controllers/SolicitudController');
const validacionSolicitud = require('../middlewares/validacionSolicitud');
const authorizeRoles = require('../middlewares/authorizeRoles');


router.get('/', authMiddleware, authorizeRoles(['ADMINISTRADOR']), SolicitudController.listar);

router.post('/', authMiddleware, authorizeRoles(['ADMINISTRADOR']), validacionSolicitud, SolicitudController.crear);

router.delete('/:id', authMiddleware, authorizeRoles(['ADMINISTRADOR']), SolicitudController.eliminar);

module.exports = router;
