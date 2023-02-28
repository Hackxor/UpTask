const express = require('express');
const router = express.Router();
//importar express validator
const {body} = require('express-validator/check');
//importar controlador
const controller = require('../controllers/controller');
const controllerTareas = require('../controllers/controllerTareas');
const controllerUsuarios = require('../controllers/controllerUsuarios');
const controllerAuth = require('../controllers/controllerAuth');



module.exports = function () {
    //ruta para el home
    router.get('/', 
    // revisar si el usuario esta autenticado
    controllerAuth.usuarioAutenticado,
    controller.index);



    router.post('/agregar-proyecto', 
    //validando formulario de nombre con express validator
     // revisar si el usuario esta autenticado
     controllerAuth.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    controller.agregarProyecto);
    
    //listar proyecto
    router.get('/proyectos/:url',  
    // revisar si el usuario esta autenticado
    controllerAuth.usuarioAutenticado,
    controller.ProyectoUrl);

    // actualizar proyecto
    router.get('/proyecto/editar/:id', 
     // revisar si el usuario esta autenticado
     controllerAuth.usuarioAutenticado,
    controller.formularioEditar)

    router.post('/actualizar-proyecto/:id', 
    body('nombreEditado').not().isEmpty().trim().escape(),
    controller.actualizarProyecto);


    // eliminar proyecto
    router.delete('/proyectos/:url', 
     // revisar si el usuario esta autenticado
     controllerAuth.usuarioAutenticado,
    controller.eliminarProyecto)

    //tareas------
    router.post('/proyectos/:url', 
     // revisar si el usuario esta autenticado
     controllerAuth.usuarioAutenticado,
    controllerTareas.agregarTarea)
    //actualizar tarea
    router.patch('/tareas/:id', controllerTareas.cambiarEstadoTarea)
    // eliminar tarea
    router.delete('/tareas/:id', 
     // revisar si el usuario esta autenticado
     controllerAuth.usuarioAutenticado,
    controllerTareas.eliminarTarea)




    // crear nueva cuenta
    router.get('/register', controllerUsuarios.formCrearCuenta)
    router.post('/register', controllerUsuarios.CrearCuenta)

    // iniciar sesion
    router.get('/login', controllerUsuarios.formLogin);
    router.post('/login-user', controllerAuth.Login);
       // cerrar sesion
       router.get('/logout', controllerAuth.Logout);

    //  reestablecer contraseña
    router.get('/retrieve', controllerUsuarios.formRetrieve);
    router.post('/retrieve', controllerAuth.enviarToken);
    router.get('/retrieve/:token', controllerAuth.ResetContraseña);
    router.post('/retrieve/:token',controllerAuth.Reset);
    return router;


 



}


