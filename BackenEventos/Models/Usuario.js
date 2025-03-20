
const { DataTypes } = require('sequelize')
const sequelize= require('../db/Connection')

const Usuario = sequelize.define('usuarios',{
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    rol: {
        type: DataTypes.ENUM('admin', 'usuario'),
    }
},

{
    tableName:'usuarios',
    timestamps:false
}

)

module.exports=Usuario;