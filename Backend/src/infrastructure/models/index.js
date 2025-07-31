const Usuario = require("./Usuario");
const Rol = require("./Rol");
const UsuarioRol = require("./UsuarioRol");
const Empleado = require("./Empleado");

// relaciones de la base de datos
Usuario.belongsToMany(Rol, {
  through: UsuarioRol,
  foreignKey: "id_usuario",
  otherKey: "id_rol",
});
Rol.belongsToMany(Usuario, {
  through: UsuarioRol,
  foreignKey: "id_rol",
  otherKey: "id_usuario",
});


module.exports = {
  Usuario,
  Rol,
  UsuarioRol,
  Empleado
};
