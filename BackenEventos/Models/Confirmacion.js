

const { DataTypes } = require('sequelize');
const sequelize = require('../db/Connection');
const Usuario = require('./Usuario');
const Evento = require('./Evento');

const Confirmacion = sequelize.define('confirmaciones', {

    id_confirmacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.ENUM('confirmado'),
        defaultValue: 'confirmado'
    },

    id_usuario: {
        type: DataTypes.INTEGER,
      
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    
    id_evento: {
        type: DataTypes.INTEGER,
      
        references: {
            model: Evento,
            key: 'id_evento'
        }
    }
}, {
    tableName: 'confirmaciones',
    timestamps: false
});

//ver video de relaciones con tablas, aplicar en todos los otros modelos

Usuario.hasMany(Confirmacion, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Evento.hasMany(Confirmacion, { foreignKey: 'id_evento', onDelete: 'CASCADE' });
Confirmacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Confirmacion.belongsTo(Evento, { foreignKey: 'id_evento' });

module.exports = Confirmacion;