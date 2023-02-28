const Sequelize = require("sequelize");
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');
const Proyectos = db.define('proyectos', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },

    nombre : {
        type : Sequelize.STRING
    },


    url : {
        type : Sequelize.STRING
    }


},{
    hooks : {
        beforeCreate(proyectoBefore) {
            const url = slug(proyectoBefore.nombre).toLowerCase();

            proyectoBefore.url = `${url}-${shortid.generate()}`;
        },
    }
}



);


module.exports = Proyectos;