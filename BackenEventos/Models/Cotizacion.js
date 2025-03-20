
const { DataTypes } = require('sequelize');
const sequelize = require('../db/Connection');
const Usuario = require('./Usuario');

const Cotizacion = sequelize.define('cotizaciones', {

    id_cotizacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_evento: {
        type: DataTypes.STRING,
       
    },
    detalles: {
        type: DataTypes.TEXT,
       
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'),
        defaultValue: 'pendiente'
    },
    
    id_usuario: {
        type: DataTypes.INTEGER,
      
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    }
}, {
    tableName: 'cotizaciones',
    timestamps: false
});

Usuario.hasMany(Cotizacion, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Cotizacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Cotizacion;