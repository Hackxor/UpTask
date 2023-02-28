const passport = require('passport');
const LocalStrategy = require('passport-local');

// referencia al modelo donde autenticaremos
const Usuarios = require('../models/Usuarios');

// LocalStrategy
passport.use(
    new LocalStrategy(
        // por default passport espera un usuario y contraseña
        {
            usernameField : 'correo',
            passwordField : 'contraseña'
        },
        async (correo,contraseña,done) =>{
            try {
                const usuario = await Usuarios.findOne({where : {correo : correo}})

                // el usuario existe, pero la contraseña quiza no
                if (!usuario.verificarContraseña(contraseña)) {
                    return done(null, false, {message : 'Contraseña incorrecta'});
                }
                // el email y contraseña son correctos, entonces...
               return done(null, usuario);


            } catch (error) {
                // validar si existe el usuario o no
                return done(null, false, {message : 'Ese usuario no existe'});
            }
        }

    )
)

// serializacion de el usuario y deserializar -> acceder a sus valores internos
passport.serializeUser((usuario, callback) =>{
    callback(null, usuario);
})

passport.deserializeUser((usuario,callback)=>{
    callback(null,usuario);
})

// exportar

module.exports = passport;