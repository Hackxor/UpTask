const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../handler/email');
const Op = Sequelize.Op;


exports.Login = passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect:'/login',
    failureFlash: true,
    badRequestMessage : 'Los campos estan vacios !'
})

// revisar si esta autenticado o no
exports.usuarioAutenticado = (req,res,next) =>{
    // si esta autenticado , ok...
    if(req.isAuthenticated()) {
        return next();
    }

    // si no esta autenticado... redirigir al formulario
    return res.redirect('/login');
}

// cerrar sesion funcion
exports.Logout = (req,res) =>{
    req.session.destroy(()=>{
        res.redirect('/login');
    })
   
}



// generar token si el usuario es valido
exports.enviarToken = async(req,res) =>{
//    verificar que el usuario existe con su correo
const usuario = await Usuarios.findOne({where : {correo : req.body.correo}});
// si no hay usuario entonces...
req.flash('error', 'No existe una cuenta con ese correo');
if (!usuario) {
    res.render('retrieve', {mensajes : req.flash()});
}

// si existe el usuario entonces...
usuario.token = crypto.randomBytes(20).toString('hex');
// expiracion
usuario.expiracion = Date.now() + 3600000;

// guardar en base de datos
   await usuario.save();

//    url reset
const urlReset = `http://${req.headers.host}/retrieve/${usuario.token}`;

// envia el correo con el token
await enviarEmail.enviar({
    usuario,
    subject: 'Password Reset', 
    urlReset, 
    archivo : 'reestablecerContraseña'
});
   
}



exports.ResetContraseña = async(req,res) =>{
   const usuario = await Usuarios.findOne({where : {token : req.params.token}});
    // si no hay usuario
    req.flash('error', 'No es valido ');
    if (!usuario) {
        res.render('retrieve', {mensajes : req.flash()});
    }

    // formulario para generar contraseña nueva
    res.render('resetContraseña');
}

// cambiar contraseña
exports.Reset = async(req,res) =>{
    // verifica el token valido y su fecha de expiracion
 const usuario = await Usuarios.findOne({where : {token : req.params.token, expiracion :{ [Op.gte] : Date.now() }}});

//  verificando si el usuario existe
req.flash('error', 'No es valido ');
if (!usuario) {
    res.render('retrieve', {mensajes : req.flash()});
}

// hashear contraseña
usuario.contraseña = bcrypt.hashSync(req.body.contraseña,  bcrypt.genSaltSync(10));
usuario.token = null;
usuario.expiracion = null;

// guardamos la nueva contraseña
await usuario.save();
req.flash('correcto', 'Tu contraseña se ha cambiado con exito!');
res.render('login', {mensajes : req.flash()});
 }