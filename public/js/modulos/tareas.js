import axios from "axios";
import Swal from "sweetalert2";
import { actualizarAvance } from '../funtions/avance';

const tareas = document.querySelector('.listado-pendientes');

if( tareas )
    tareas.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.dataset.tarea;

            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url,{ idTarea })
                .then(function(resp){
                    if( resp.status === 200)
                        icono.classList.toggle('completo');

                        actualizarAvance();
                })
        }

        if (e.target.classList.contains('fa-trash')) {
            const tareaHtml = e.target.parentElement;
            const idTarea = tareaHtml.dataset.tarea;

            Swal.fire({
                title: 'Estas seguro de borrar esta Tarea?',
                text: "Si eliminas una Tarea, esta no se podra recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    //enviar peticion axion 
                    const url = `${location.origin}/tareas/${idTarea}`;
                    
                    axios.delete(url, { params: {idTarea}})
                        .then(function(respuesta){
                            if( respuesta.status === 200) {
                                tareaHtml.parentElement.removeChild(tareaHtml);

                                actualizarAvance();

                                Swal.fire(
                                    'Eliminada!',
                                    respuesta.data,
                                    'success'
                                );
                            }
                        })
                }
            })
        }
    });

export default tareas;