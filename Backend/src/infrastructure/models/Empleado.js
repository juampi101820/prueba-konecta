const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Empleado = sequelize.define(
    "Empleado",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        fecha_ingreso: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        salario: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
        },
    },
    {
        tableName: "empleado",
        timestamps: false,
    }
);

module.exports = Empleado;