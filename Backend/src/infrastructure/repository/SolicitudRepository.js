const { Solicitud, Empleado } = require('../models');

class SolicitudRepository {
    static async listar({ limit = 20, offset = 0 } = {}) {
        return Solicitud.findAndCountAll({
            include: [{ model: Empleado }],
            limit,
            offset,
            order: [['id', 'ASC']]
        });
    }

    static async crear(datos) {
        return Solicitud.create(datos);
    }

    static async eliminar(id) {
        return Solicitud.destroy({ where: { id } });
    }
}

module.exports = SolicitudRepository;
