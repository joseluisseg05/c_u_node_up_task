const path = require('path');
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const db = require('./config/db');
const { vardump } = require('./helpers');
const passport = require('./config/passport');

require('./models/Proyecto');
require('./models/Tarea');
require('./models/Usuarios');

//craer una app de express
const app = express();

//body parse
app.use(express.urlencoded({extends: true}));

//archivos public
app.use(express.static('public'));

//Pug
app.set('view engine', 'pug');

//carpeta vistas
app.set('views', path.join(__dirname, '/views'));

//flash mesajes
app.use(flash());

app.use(cookieParser());

//sessiones
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//helpers
app.use((req, res, next)=> {
    res.locals.vardump = vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null
    next();
});

//rutas
app.use('/', routes() );

//db 
db.sync()
    .then(()=> console.log('Conectado al servidor'))
    .catch(error => console.log(error));

//
app.listen(8080);
