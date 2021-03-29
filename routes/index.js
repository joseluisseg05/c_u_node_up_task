const { Router } = require('express');
const proyect = require('../controllers/proyectos');
const tareas = require('../controllers/tareas');
const usuarios = require('../controllers/usuarios');
const auth = require('../controllers/auth')

const router = Router();

module.exports = function () {
    router.get('/', proyect.dash);

    router.get('/home',
        auth.usuarioAutentificado,
        proyect.home
    );
    router.get('/nuevo-proyecto', 
        auth.usuarioAutentificado,
        proyect.formulario
    );
    router.post('/nuevo-proyecto', 
        auth.usuarioAutentificado, 
        proyect.nuevo
    );

    //listar proyecto 
    router.get('/proyectos/:url',
        auth.usuarioAutentificado,
        proyect.porUrl
    );

    //actulizar Proyecto 
    router.get('/proyectos/editar/:id', 
        auth.usuarioAutentificado,
        proyect.editarFormulario
    );
    router.post('/nuevo-proyecto/:id',
        auth.usuarioAutentificado, 
        proyect.actualizar
    );

    //eliminar
    router.delete('/proyectos/:url', 
        auth.usuarioAutentificado,
        proyect.eleminar
    );


    /* 
    Tareas
    */
    router.post('/proyectos/:url', 
        auth.usuarioAutentificado,
        tareas.crear
    );

    //actualizar
    router.patch('/tareas/:id', 
        auth.usuarioAutentificado,
        tareas.cambiarEstado
    );
    //eliminarr
    router.delete('/tareas/:id', 
        auth.usuarioAutentificado,
        tareas.eliminar
    );


    /*Creacion de nueva cuenta*/
    router.get('/crear-cuenta', usuarios.formCrearCuenta);
    router.post('/crear-cuenta', usuarios.crearCuenta);
   
    //Inicar sesion 
    router.get('/iniciar-sesion', usuarios.formIniciarSesion);
    router.post('/iniciar-sesion', auth.autenticarUser)

    //cerrar sesion 
    router.get('/cerrar-sesion', auth.cerrarSesion);

    //reestablecer contra
    router.get('/reestablecer', usuarios.formRestablecerPass);
    router.post('/reestablecer', auth.enviarToken);
    router.get('/reestablecer/:token', auth.validarToken);
    router.post('/reestablecer/:token', auth.actualizarPass)

    return router;
} 