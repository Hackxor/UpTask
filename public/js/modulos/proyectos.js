import axios from "axios";
import Swal from "sweetalert2";

const btnEliminar = document.querySelector('#eliminar-proyecto') ;
 
btnEliminar.addEventListener('click',  (e) =>{
  const urlProyecto = $('#eliminar-proyecto').data( 'proyecto' );
    

      // console.log(urlProyecto);
      Swal.fire({
        title: 'Deseas borrar este proyecto?',
        text: "Un proyecto eliminado no se puede recuperar",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar', 
        cancelButtonText: 'No, Cancelar'
    }).then((result) => {
        if (result.value) {
            // enviar petición a axios
            const url = `${location.origin}/proyectos/${urlProyecto}`;

            axios.delete(url, { params: {urlProyecto}})
                .then(function(respuesta){
                    console.log(respuesta);

                        Swal.fire(
                            'Proyecto Eliminado',
                            respuesta.data,
                            'success'
                        );

                        // redireccionar al inicio
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 3000);
                })
                .catch(() => {
                    Swal.fire({
                        type:'error',
                        title: 'Hubo un error',
                        text: 'No se pudo eliminar el Proyecto'
                    })
                })
        }
    })
})

export default btnEliminar;

