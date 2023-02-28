const express = require('express');
const routes = require('./routes');
const path = require('path');
const parser = require('body-parser');
const helpers = require('./helpers');
const flash = require('connect-flash');
const session = require('express-session');
const cookie = require('cookie-parser');
const passport = require('./config/passport');
//crear la conexion a la db
const db = require('./config/db');

//importar modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.log(error));


//crear app de express
const app = express();
app.listen(5000)

// agregar flash messages
app.use(flash());

// sesiones
app.use(session({
    secret:'secreto',
    resave:false,
    saveUninitialized:false
}));

// passport inicializando..
app.use(passport.initialize());
app.use(passport.session());

// importamos var dump a la app
app.use((req,res,next) =>{
    //variables globales
res.locals.vardump = helpers.vardump;
res.locals.mensajes = req.flash();
// verificar que usuario se va a logear
res.locals.usuario= {...req.user} || null;
next();
});

//habilitar pug
app.set('view engine', 'ejs');
//agregar carpetas de vistas
app.set('views', path.join(__dirname, './views'));

//cargar archivos estaticos
app.use(express.static(__dirname + '/public/'));

//habilitar body parser para leer datos de formularios
app.use(parser.urlencoded({extended: true}));




//rutas
app.use('/', routes());

