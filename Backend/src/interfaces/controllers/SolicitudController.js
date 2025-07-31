const SolicitudService = require('../../application/services/SolicitudService');

const listar = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const limite = parseInt(req.query.limite) || 20;

        const filtros = {
            tipo: req.query.tipo || undefined,
            nombre_empleado: req.query.nombre_empleado || undefined,
            fecha: req.query.fecha || undefined,
            fecha_inicio: req.query.fecha_inicio || undefined,
            fecha_fin: req.query.fecha_fin || undefined,
        };

        const respuesta = await SolicitudService.listar({ pagina, limite, filtros });
        res.json(respuesta);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno.' });
    }
};

const crear = async (req, res) => {
    try {
        const solicitud = await SolicitudService.crear(req.body);
        res.status(201).json(solicitud);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno.' });
    }
};

const eliminar = async (req, res) => {
    try {
        await SolicitudService.eliminar(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno.' });
    }
};

module.exports = { listar, crear, eliminar };
