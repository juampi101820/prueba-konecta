const { Empleado } = require('../models');

class EmpleadoRepository {
  static async listarConTotal({ limit = 20, offset = 0 } = {}) {
    return Empleado.findAndCountAll({
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
