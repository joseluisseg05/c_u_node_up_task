import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        //proyectoUrl; forma de quitar (-) del nombre
        const urlProyecto = e.target.dataset.proyectoUrl;

        Swal.fire({
            title: 'Estas seguro de borrar este proyecto?',
            text: "Si eliminas un proyecto, este no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                //enviar peticion axion 
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                
                axios.delete(url, { params: urlProyecto})
                    .then(function(respuesta){
                        Swal.fire(
                            'Eliminado!',
                            'Tu proyecto fue eliminado.',
                            'success'
                        );
                        //redirrecion
                        setTimeout(() => { //despues de un tiempo se ejecuta la instruccion
                            window.location.href = '/'
                        }, 1000);//tiempo 1s
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error.',
                            text: 'No se pudo eliminar el proyecto'
                        });
                    });
            }
        })
    });
}

export default btnEliminar;