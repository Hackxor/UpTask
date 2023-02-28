const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');
const Usuarios = require('../models/Usuarios');
const slug = require('slug');

//home
exports.index = async(req,res) =>{
 // verificando relaciones con id del usuario
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({where : {usuarioId}});

    res.render("index",{proyectos});
}




exports.agregarProyecto = async(req,res) =>{
    //Insertando registro
    
    const { nombre } = req.body;
    const usuarioId = res.locals.usuario.id;
  const proyecto = await Proyectos.create({nombre, usuarioId});

  res.redirect('/')
    
}




exports.ProyectoUrl = async(req,res) =>{
   // verificando relaciones con id del usuario
   const usuarioId = res.locals.usuario.id;
   const proyectosPromise =  Proyectos.findAll({where : {usuarioId}});
  

 const proyectoPromise = await Proyectos.findOne(
  {where : {
    url : req.params.url,
    usuarioId : usuarioId
  }}
  
  );
// consultando proyectos
  const [proyectos , proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);




    //consultar tareas de este proyecto actual
    const tareas = await Tareas.findAll({where : { proyectoId : proyecto.id}});
  // render a la vista
  res.render('tareas', {proyectos,proyecto,tareas})
}


// actualizar proyecto
exports.formularioEditar = async(req,res) =>{
   // verificando relaciones con id del usuario
   const usuarioId = res.locals.usuario.id;
   const proyectosPromise = Proyectos.findAll({where : {usuarioId}});

   const proyectoPromise = await Proyectos.findOne(
    {where : {
      id : req.params.id,
      usuarioId
    }}
    
    );

   // consultando proyectos
  const [proyectos , proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);

  
    res.render("editarProyecto", {proyectos, proyecto });
}

exports.actualizarProyecto = async(req,res) =>{
  //Insertando registro
   // verificando relaciones con id del usuario
   const usuarioId = res.locals.usuario.id;
   const proyectos = Proyectos.findAll({where : {usuarioId}});
  
  const { nombreEditado } = req.body;


 await Proyectos.update({nombre : nombreEditado}, {where : {id : req.params.id}});
res.redirect('/')
  
}


//eliminando proyecto
exports.eliminarProyecto = async(req,res,next) =>{

  const {urlProyecto} = req.query;
  const resultado = await Proyectos.destroy({ where : {url : urlProyecto}});
  res.send('Proyecto eliminado exitosamente');
}



