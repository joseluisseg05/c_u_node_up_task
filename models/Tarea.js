const Sequelize = require('sequelize');
const db = require('../config/db');

const Proyecto = require('./Proyecto');

const Tareas = db.define('tareas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(100)//limitar caracteres
    },
    estado: {
        type: Sequelize.INTEGER(1)
    },
});

//debe de ur en el modelo indicado
Tareas.belongsTo(Proyecto); //una tarea pertenece a un proyecto
//Proyecto.hasMany(Tareas);//un proyecto puede tener varias tareas



module.exports = Tareas