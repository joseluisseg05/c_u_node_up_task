const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Usuarios');

//localstrategy
passport.use(
    new localStrategy(
        //por default espera user y pass
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email,
                        activo: 1 //para la confirmacion de cuenta 
                    }
                });
                //
                if ( !usuario.verificarPassword(password)) 
                    return done(null, false, {
                        message: 'Password incorrecto'
                    });
                
                return done(null, usuario)
            } catch (error) {
                //el user no existe
                return done(null, false, {
                    message: 'La cuenta no existe'
                });
            }
        }
    )
);

//serializar 
passport.serializeUser((usuario, callback) => {
    callback(null, usuario)
})

//deserializar
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario)
})

module.exports = passport;
