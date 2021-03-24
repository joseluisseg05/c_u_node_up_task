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

    res.redirect(`proyectos/${req.params.url}`);

}