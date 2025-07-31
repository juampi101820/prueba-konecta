const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Rol = sequelize.define(
  "Rol",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "rol",
    timestamps: false,
  }
);

module.exports = Rol;
