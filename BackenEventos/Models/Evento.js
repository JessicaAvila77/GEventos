
const { DataTypes } = require('sequelize');
const sequelize = require('../db/Connection');

const Evento = sequelize.define('eventos', {

    id_evento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    fecha_hora: {
        type: DataTypes.DATE,
       
    },
    ubicacion: {
        type: DataTypes.STRING,
    
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    }
}, {
    tableName: 'eventos',
    timestamps: false
});

module.exports = Evento;