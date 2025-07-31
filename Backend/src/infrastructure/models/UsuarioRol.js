const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const UsuarioRol = sequelize.define(
  "UsuarioRol",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "usuario",
        key: "id",
      },
    },
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "rol",
        key: "id",
      },
    },
  },
  {
    tableName: "usuario_rol",
    timestamps: false,
  }
);

module.exports = UsuarioRol;
