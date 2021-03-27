const passport = require('passport');

exports.autenticarUser = passport.authenticate('local', {
    successRedirect:'/',
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
        res.redirect('/');
    })
}