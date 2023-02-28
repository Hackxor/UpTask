const Tareas = require('../models/Tareas');
const Proyectos = require('../models/Proyectos');

exports.agregarTarea = async(req,res,next) =>{
   

    //obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({where : {url : req.params.url}});

    const { tarea } = req.body;
    //obteniendo estado y id del proyecto actual
    const estado = 0;
    const proyectoId = proyecto.id

     //Insertando tarea
        const tareas = await Tareas.create({tarea,estado,proyectoId});

        if (!tareas) {
            return next();
        }
        //redireccionar
            res.redirect(`/proyectos/${req.params.url}`);
    
}

exports.cambiarEstadoTarea =  async(req,res,next) =>{
    const {id} = req.params;
    const tarea = await Tareas.findOne({where : {id : id}});
    //cambiar estado
    let estado = 0;
    if (tarea.estado == estado) {
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if (!resultado) {
        return next();
    }
res.status(200).send('actualizado');
}


// eliminar tarea
exports.eliminarTarea =  async(req,res,next) =>{
    const {id} = req.params;
    const resultado = await Tareas.destroy({where : {id : id}});
 
    if (!resultado) {
        return next();
    }
res.status(200).send('eliminado');
}