import axios from "axios";
import Swal from "sweetalert2";
import {avanceUpdate} from "../funciones/avance";
const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
    
tareas.addEventListener('click', (e) =>{
if (e.target.classList.contains('fa-check-circle')) {
    // const id = $('.checkEditado').data( 'proyecto' );
    const icono = e.target;
    const idTarea = icono.parentElement.parentElement.dataset.tarea;
    // request a id de cada tareas/:id
    const url = `${location.origin}/tareas/${idTarea}`;
    axios.patch(url, { idTarea })
        .then(function(respuesta){
            if (respuesta.status === 200) {
                icono.classList.toggle('completo');
                avanceUpdate();
            }
        })

}

// mandando peticion para eliminar con axios
if (e.target.classList.contains('fa-trash')) {
    
    const tareaHTML = e.target.parentElement.parentElement;
          const  idTarea = tareaHTML.dataset.tarea;
          const url = `${location.origin}/tareas/${idTarea}`;
    axios.delete(url, {params : {idTarea}})
        .then(function(respuesta){
            if (respuesta.status === 200) {
                tareaHTML.parentElement.removeChild(tareaHTML);
                avanceUpdate();
            }
        })


}

})


}

export default tareas;