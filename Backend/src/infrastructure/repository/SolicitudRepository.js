const { Solicitud, Empleado } = require('../models');
const { Op } = require('sequelize');

class SolicitudRepository {
    static async listar({ limit = 20, offset = 0, filtros = {} } = {}) {
        const where = {};

        if (filtros.tipo) {
            where.tipo = { [Op.iLike]: `%${filtros.tipo}%` };
        }

        if (filtros.id_empleado) {
            where.id_empleado = filtros.id_empleado;
        }

        if (filtros.fecha_inicio && filtros.fecha_fin) {
            where.fecha = {
                [Op.between]: [filtros.fecha_inicio, filtros.fecha_fin],
            };
        } else if (filtros.fecha) {
            where.fecha = filtros.fecha;
        }

        return Solicitud.findAndCountAll({
            where,
            include: [{ model: Empleado }],
            limit,
            offset,
            order: [['id', 'ASC']],
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
