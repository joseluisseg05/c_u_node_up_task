const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Usuarios = require('../models/Usuarios');

const Op = Sequelize.Op;

exports.autenticarUser = passport.authenticate('local', {
    successRedirect:'/home',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//sabes si esta logueado o no 
exports.usuarioAutentificado = (req, res, next) => {
    // si el usuario esta autenficado
    if (req.isAuthenticated())
        return next();
    // sinoredirigir al formulario 
    return res.redirect('/iniciar-sesion');
}

//cerrar sesion 
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    })
}

//token para user 
exports.enviarToken = async (req, res, next) => {
    const { email } = req.body;
    const usuario = await Usuarios.findOne({ where: { email } });

    if( !usuario ){
        req.flash('error', 'No existe la cuenta')
        res.redirect('/reestablecer');
    }

    usuario.token = crypto.randomBytes(50).toString('hex');
    usuario.expiracion = Date.now() + 3600000; //la fecha de hoy mas una hora

    await usuario.save();

    //url rest
    const restUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`
}

exports.validarToken = async(req, res) => {
    const usuario = await Usuarios.findOne({
        where: { 
            token: req.params.token
        }
    })

    if (!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/reestablecer');
    }

    //form para nuevo pass
    res.render('resetPassword', {
        nombrePag: 'Reestablecer Contraseña'
    })
}

exports.actualizarPass = async(req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now()//operador mayor o igual 
            }
        }
    })

    if (!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/reestablecer');
    }

    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    usuario.token = null;
    usuario.expiracion = null;

    await usuario.save()

    req.flash('correcto', 'La contraseña se a modificado correctamente');
    res.redirect('/iniciar-sesion');
}