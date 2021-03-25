import Swal from "sweetalert2";

export const actualizarAvance = () => {
    //tareas existentes 
    const tareas = document.querySelectorAll('li.tarea');

    if( tareas.length){
        //tareas completadoas
        const completas = document.querySelectorAll('i.completo');
        //avance 
        const avance = Math.round((completas.length / tareas.length) * 100);
        //render 
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%';

        if( avance == 100 )
            Swal.fire(
                'Completado!',
                'Las tareas del proyecto fueron completadas',
                'success'
            );
    }
}