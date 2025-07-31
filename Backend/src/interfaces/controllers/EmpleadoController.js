const EmpleadoService = require('../../application/services/EmpleadoService');

const listar = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const limite = parseInt(req.query.limite) || 20;
        const respuesta = await EmpleadoService.listar({ pagina, limite });
        res.json(respuesta);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno.' });
    }
};

const crear = async (req, res) => {
  try {
    const empleado = await EmpleadoService.crear(req.body);
    res.status(201).json(empleado);
  } catch (error) {
    console.error('Error en crear empleado:', error);
    res.status(500).json({ mensaje: 'Error interno.' });
  }
};

module.exports = { listar, crear };
