const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handers/email')

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

        //crear url para confirmar
        const confirmarUrl = `http://${req.headers.host}/reestablecer/${email}`
        const usuario = {
            email
        }
        //enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirmar cuenta UpTask',
            confirmarUrl,
            archivo: 'confirmar'
        });

        req.flash('correcto', 'Enviamos un correo a tu cuenta');
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

exports.formRestablecerPass = async(req, res) => {
    res.render('reestablecer', {
        nombrePag: 'Reestablecer Contraseña'
    })
}

exports.confirmarCuenta = async(req, res) => {
    const usuario = await Usuario.findOne({
        where: {
            email: req.params.correo
        }
    });

    if( !usuario ){
        req.flash('error', 'No valido')
        res.redirect('/crear-cuenta')
    }

    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto', 'Cuenta confirmada')
    res.redirect('/iniciar-sesion')
}