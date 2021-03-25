import axios from "axios";

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
                })
        }
    });

export default tareas;