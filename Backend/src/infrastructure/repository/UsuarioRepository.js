const { Usuario, Rol } = require('../models');
const { Op } = require('sequelize');

class UsuarioRepository {
    static async buscarPorUsuarioOCorreo(usuario, correo, transaction = null) {
        return Usuario.findOne({
            where: { [Op.or]: [{ usuario }, { correo }] },
            transaction
        });
    }
    static async crear(datos, options = {}) {
        return Usuario.create(datos, options);
    }
    static async asignarRol(usuario, rol, transaction = null) {
        return usuario.addRol(rol, { transaction });
    }
    static async buscarUsuarioYRoles(usuario) {
        return Usuario.findOne({
            where: { usuario },
            include: [{ model: Rol, through: { attributes: [] } }]
        });
    }
}
module.exports = UsuarioRepository;