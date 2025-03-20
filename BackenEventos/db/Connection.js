
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    'gestionevento',
    'root',
    'root',
    {
        host:'localhost',
        port:3306,
        dialect:'mysql'
    }

)

sequelize.authenticate()
    .then(()=> console.log('Conexion exitosa'))
    .catch(err=> console.log('Ocurrio un error'))
    
module.exports= sequelize