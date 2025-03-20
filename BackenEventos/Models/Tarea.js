const { DataTypes } = require('sequelize');
const sequelize = require('../db/Connection');
const Evento = require('./Evento');

const Tarea = sequelize.define('tareas', {

    id_tarea: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,

    },
    responsable: {
        type: DataTypes.STRING,
 
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'completada'),
        defaultValue: 'pendiente'
    },
    
    id_evento: {
        type: DataTypes.INTEGER,

        references: {
            model: Evento,
            key: 'id_evento'
        }
    }
}, {
    tableName: 'tareas',
    timestamps: false
});

Evento.hasMany(Tarea, { foreignKey: 'id_evento', onDelete: 'CASCADE' });
Tarea.belongsTo(Evento, { foreignKey: 'id_evento' });

module.exports = Tarea;