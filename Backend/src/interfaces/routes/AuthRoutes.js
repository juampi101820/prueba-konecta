const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/AuthController');
const validacionRegistro = require('../middlewares/ValidacionRegistro');

router.post('/register', validacionRegistro, register);
router.post('/login', login);

module.exports = router;
