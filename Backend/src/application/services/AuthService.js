const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioRepository = require('../../infrastructure/repository/UsuarioRepository');
const RolRepository = require('../../infrastructure/repository/RolRepository');
const sequelize = require('../../config/database');

const UsuarioYaExisteError = require('../../domain/errors/UsuarioYaExisteError');
const RolInexistenteError = require('../../domain/errors/RolInexistenteError');
const CredencialesIncorrectasError = require('../../domain/errors/CredencialesIncorrectasError');

class AuthService {
    static async register({ usuario, correo, contrasena, id_rol }) {
        if (!id_rol) throw new RolInexistenteError('Debe especificar el id del rol.');

        return await sequelize.transaction(async (t) => {
            const rol = await RolRepository.buscarPorId(id_rol, t);
            if (!rol) throw new RolInexistenteError();

            const existe = await UsuarioRepository.buscarPorUsuarioOCorreo(usuario, correo, t);
            if (existe) throw new UsuarioYaExisteError();

            const hash = await bcrypt.hash(contrasena, 10);
            const nuevoUsuario = await UsuarioRepository.crear(
                { usuario, correo, contrasena: hash },
                { transaction: t }
            );

            await UsuarioRepository.asignarRol(nuevoUsuario, rol, t);

            return {
                id: nuevoUsuario.id,
                usuario: nuevoUsuario.usuario,
                correo: nuevoUsuario.correo,
                rol: rol.nombre
            };
        });
    }

    static async login({ usuario, contrasena }) {
        const usuarioBD = await UsuarioRepository.buscarUsuarioYRoles(usuario);
        if (!usuarioBD) throw new CredencialesIncorrectasError();

        const valido = await bcrypt.compare(contrasena, usuarioBD.contrasena);
        if (!valido) throw new CredencialesIncorrectasError();

        const roles = usuarioBD.Rols.map(r => r.nombre);

        const token = jwt.sign(
            { id: usuarioBD.id, usuario: usuarioBD.usuario, roles },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        return { token };
    }
}

module.exports = AuthService;