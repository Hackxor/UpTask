const Sequelize = require("sequelize");
const bcrypt = require('bcrypt-nodejs');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const Usuarios = db.define('usuarios', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },

    nombre : {
        type : Sequelize.STRING(20)
    },

    apellido : {
        type : Sequelize.STRING(20)
    },

    correo : {
        type : Sequelize.STRING(60),
        allowNull : false,
// validar formulario 
        validate : {
            isEmail : {msg : 'Agrega un correo valido'},
            notEmpty : {msg : 'La contraseña no puede estar vacia'}
        },

        unique : {args : true , msg : 'Usuario ya registrado'}

    },

    contraseña : {
        type : Sequelize.STRING(60),
        allowNull : false,

        validate : {
            notEmpty : {msg : 'La contraseña no puede estar vacia'}
        }
    },

    // generar token para reestablecer cuenta
    token : Sequelize.STRING,
    expiracion : Sequelize.DATE
 
}, {
    hooks : {
        beforeCreate(usuario) {
            usuario.contraseña = bcrypt.hashSync(usuario.contraseña, bcrypt.genSaltSync(10));
        },
    }
});


// metodos personalizados
Usuarios.prototype.verificarContraseña = function(contraseña) {
   return bcrypt.compareSync(contraseña, this.contraseña)
}

// los usuarios pueden tener multiples proyectos
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;