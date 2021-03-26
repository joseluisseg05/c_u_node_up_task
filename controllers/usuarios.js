const Usuarios = require('../models/Usuarios');

exports.formCrearCuanta = (req, res) => {
    res.render('crearCuenta', {
        nombrePag: 'Crear Cuenta de UpTask'
    })
}

exports.crearCuanta = async(req, res) => {
    const { email, password } = req.body;

    try {
        await Usuarios.create({ 
            email, 
            password 
        });
        res.redirect('/iniciar-sesion');

    } catch (error) {
        req.flash('error', error.errors.map(error => error.message))
        res.render('crearCuenta', {
            nombrePag: 'Crear Cuenta de UpTask',
            mensajes: req.flash(),
            email,
            password
        })
    }
}