const Tareas = require('../models/Tarea');
const Proyectos = require('../models/Proyecto');

exports.crear = async(req, res, next) => {
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });
    const data = {
        nombre: req.body.tarea,
        estado: 0,
        proyectoId: proyecto.id
    }

    const tarea = await Tareas.create(data);

    if (!tarea)
        return next();

    res.redirect(`/proyectos/${req.params.url}`);

}

exports.cambiarEstado= async(req, res, next) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({
        where: { id }
    });

    //cambiar estado 
    let estado = 0;

    if ( tarea.estado === estado) 
        estado = 1;
    
    tarea.estado = estado;

    const resultado = await tarea.save();

    if( !resultado ) return next()

    res.status(200).send('ok')

}

exports.eliminar = async(req, res, next) => {
    const { id } = req.params;
    const resultado = await Tareas.destroy({where: {id}});

    if (!resultado ) return next()

    res.status(200).send('La Tarea Fue Eliminada Correctamente.')
}