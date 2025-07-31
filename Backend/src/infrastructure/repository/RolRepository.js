const { Rol } = require('../models');

class RolRepository {
    
  static async buscarPorId(id, transaction = null) {
    return Rol.findByPk(id, { transaction });
  }
}

module.exports = RolRepository;