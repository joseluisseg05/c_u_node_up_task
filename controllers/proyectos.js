const Proyecto = require('../models/Proyecto');
const Tareas = require('../models/Tarea');

exports.dash = async (req, res) => {
    //render toma dos params. la primera a que va a renderizar y la segunda variables 
    

    res.render('dash', {
        nombrePag: 'Proyectos'
    });
}

exports.home = async (req, res) => {
    //render toma dos params. la primera a que va a renderizar y la segunda variables 
    const usuarioId = res.locals.usuario.id;
    const proyectos = await  Proyecto.findAll({ where: { usuarioId } });

    res.render('index', {
        nombrePag: 'Proyectos',
        proyectos
    });
}

exports.formulario = async(req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await  Proyecto.findAll({ where: { usuarioId } });

    res.render('nuevoProyecto', {
        nombrePag: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevo = async (req, res) => {
    //res.send('Enviaste el formulario');
    const { nombre } = req.body;
    const usuarioId = res.locals.usuario.id;
    const proyectos = await  Proyecto.findAll({ where: { usuarioId } });

    let errores = [];
    if ( !nombre ){
        errores.push({'msj': 'Falta nombre'});
    }

    if(errores.length > 0 ){
        res.render('nuevoProyecto', {
            nombrePag: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        //
        const proyecto = await Proyecto.create({ nombre, usuarioId });
        if (proyecto) 
            res.redirect('/home');
    }

    
}

exports.porUrl = async (req, res, next) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyecto.findAll({ where: { usuarioId } });
    const proyectoPromise = Proyecto.findOne({
        where: {
            url: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([
        proyectosPromise,
        proyectoPromise
    ]);

    //Tareas del proyecto
    const tareas = await Tareas.findAll({
        where:{
            proyectoId: proyecto.id
        },
        /*include: [ //trae la informacion del modelo que esta realacionado
            {
                model: Proyecto
            }
        ]*/
    })
    
    if ( !proyecto ) return next();
    
    //vista
    res.render('tareas', {
        nombrePag: 'Tareas del proyecto',
        proyecto,
        proyectos,
        tareas
    });
}

exports.editarFormulario = async(req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyecto.findAll({ where: { usuarioId } });
    const proyectoPromise = Proyecto.findOne({ where: { id:req.params.id }});

    const [proyectos, proyecto] = await Promise.all([
        proyectosPromise,
        proyectoPromise
    ]);

    //vista 
    res.render('nuevoProyecto', {
        nombrePag: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizar = async (req, res) => {
    //res.send('Enviaste el formulario');
    const { nombre } = req.body;
    const usuarioId = res.locals.usuario.id;
    const proyectos = await  Proyecto.findAll({ where: { usuarioId } });

    let errores = [];
    if ( !nombre ){
        errores.push({'msj': 'Falta nombre'});
    }

    if(errores.length > 0 ){
        res.render('nuevoProyecto', {
            nombrePag: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        //
        const proyecto = await Proyecto.update(
            { nombre }, 
            { 
                where: {id: req.params.id}
            });
        if (proyecto) 
            res.redirect('/home');
    }

    
}

exports.eleminar = async(req, res, next) => {
    const { url } = req.params;
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyecto.findAll({ where: { usuarioId } });
    const proyectoPromise = Proyecto.destroy({
        where: { url }
    });

    const [proyectos, proyecto] = await Promise.all([
        proyectosPromise,
        proyectoPromise
    ]);

    if ( !proyecto ) 
        return next()    

    //vista 
    res.render('index', {
        nombrePag: 'Proyectos',
        proyectos
    })
}