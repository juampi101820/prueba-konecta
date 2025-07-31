const { Empleado } = require('../models');
const { Op } = require('sequelize');

class EmpleadoRepository {
  static async listarConTotal({ limit = 20, offset = 0, filtros = {} } = {}) {
    const where = {};

    if (filtros.nombre) {
      where.nombre = { [Op.iLike]: `%${filtros.nombre}%` };
    }

    if (filtros.fecha_ingreso) {
      where.fecha_ingreso = filtros.fecha_ingreso;
    }

    if (filtros.salario) {
      const salario = parseFloat(filtros.salario);
      if (!isNaN(salario)) {
        where.salario = salario;
      }
    }

    console.log('WHERE construido:', where);
    return Empleado.findAndCountAll({
      where,
      limit,
      offset,
      order: [['id', 'ASC']]
    });
  }

  static async crear(datos) {
    return Empleado.create(datos);
  }
}

module.exports = EmpleadoRepository;
