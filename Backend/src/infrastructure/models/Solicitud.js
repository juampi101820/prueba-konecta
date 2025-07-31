const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Solicitud = sequelize.define(
    "Solicitud",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        id_empleado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'empleado',
                key: 'id'
            }
        }
    },
    {
        tableName: "solicitud",
        timestamps: false,
    }
);

module.exports = Solicitud;
