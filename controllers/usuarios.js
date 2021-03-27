const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePag: 'Crear Cuenta de UpTask'
    })
}

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes
    res.render('iniciarSesion', {
        nombrePag: 'Inicio de sesion de UpTask',
        error 
    })
}

exports.crearCuenta = async(req, res) => {
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