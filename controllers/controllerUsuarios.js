const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req,res) =>{
res.render('register');
}

exports.CrearCuenta = async(req,res) =>{
    //leer datos
    const {nombreUsuario , apellidoUsuario , correoUsuario , contraseñaUsuario } = req.body;
   
    try {
           // insertar datos
       await Usuarios.create({
            nombre : nombreUsuario
            , apellido : apellidoUsuario 
            , correo : correoUsuario 
            , contraseña : contraseñaUsuario
        })
        res.redirect('/login');

    } catch (error) {
        req.flash('error',  error.errors.map(error => error.message) )
        res.render('register',
        {mensajes: req.flash() }
        );
    }
    }


// iniciar sesion
    exports.formLogin = (req,res) =>{
        const {error} = res.locals.mensajes;
        res.render('login', {error});
        }

        exports.Login = async(req,res) =>{
            
           
        }

 exports.formRetrieve = (req,res) =>{
     res.render('retrieve');
}