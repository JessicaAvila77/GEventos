const { DataTypes } = require('sequelize');
const sequelize = require('../db/Connection');
const Evento = require('./Evento');

const Presupuesto = sequelize.define('presupuesto', {

    id_presupuesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    partida: {
        type: DataTypes.STRING,
       
    },

    estimado: {
        type: DataTypes.DECIMAL(10,2),
       
    },
    
    id_evento: {
        type: DataTypes.INTEGER,
     
        references: {
            model: Evento,
            key: 'id_evento'
        }
    }
}, {
    tableName: 'presupuesto',
    timestamps: false
});

Evento.hasMany(Presupuesto, { foreignKey: 'id_evento', onDelete: 'CASCADE' });
Presupuesto.belongsTo(Evento, { foreignKey: 'id_evento' });

module.exports = Presupuesto;