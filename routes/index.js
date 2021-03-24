const { Router } = require('express');
const proyect = require('../controllers/proyectos');
const tareas = require('../controllers/tareas');

const router = Router();

module.exports = function () {
    router.get('/', proyect.home);
    router.get('/nuevo-proyecto', proyect.formulario);
    router.post('/nuevo-proyecto', proyect.nuevo);

    //listar proyecto 
    router.get('/proyectos/:url', proyect.porUrl);

    //actulizar Proyecto 
    router.get('/proyectos/editar/:id', proyect.editarFormulario);
    router.post('/nuevo-proyecto/:id', proyect.actualizar);

    //eliminar
    router.delete('/proyectos/:url', proyect.eleminar);


    /* 
    Tareas
    */
   router.post('/proyectos/:url', tareas.crear);

    return router;
} 