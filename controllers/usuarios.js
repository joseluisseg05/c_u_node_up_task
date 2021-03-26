const Usuarios = require('../models/Usuarios');

exports.formCrearCuanta = (req, res) => {
    res.render('crearCuenta', {
        nombrePag: 'Crear Cuenta de UpTask'
    })
}

exports.crearCuanta = (req, res) => {
    const { email, password } = req.body;

    Usuarios.create({ email, password })
        .then(() => {
            res.redirect('/iniciar-sesion');
        });
}