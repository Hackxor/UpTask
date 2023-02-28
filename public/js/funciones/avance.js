import Swal from "sweetalert2";

export const avanceUpdate = () =>{
    const texto = document.querySelector('textoBarra');
// Seleccionar las tareas que existen
const tareas = document.querySelectorAll('li.tarea');
if (tareas.length) {
    
 // Seleccionar las tareas completadas
const tareasCompletas = document.querySelectorAll('i.completo');

// Calcular avance
const avance = Math.round((tareasCompletas.length / tareas.length) * 100);




// Mostrar el avance
const porcentaje = document.querySelector('.porcentaje');
porcentaje.style.width = avance+"%";

//alerta
if (avance === 100) {
    Swal.fire(
        'Proyecto Completado',
        'Felicidades, terminaste tus tareas',
        'success'
    )
    
}


}





}