const Sequelize = require('sequelize');
const shortid = require('shortid');
const slug = require('slug');

const db = require('../config/db');

const Proyecto = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    }
}, {
    hooks: {
        beforeCreate(proyecto) {
            const url = slug(proyecto.nombre).toLocaleLowerCase();
            
            proyecto.url = `${url}-${shortid.generate()}`;
        }
    }
});


module.exports = Proyecto;