const path = require('path');
const express = require('express');

const routes = require('./routes');
const db = require('./config/db');
const { vardump } = require('./helpers');
require('./models/Proyecto');

//craer una app de express
const app = express();

//archivos public
app.use(express.static('public'));

//Pug
app.set('view engine', 'pug');

//carpeta vistas
app.set('views', path.join(__dirname, '/views'));

//helpers
app.use((req, res, next)=> {
    res.locals.vardump = vardump;
    next();
});

//body parse
app.use(express.urlencoded({extends: true}));

//rutas
app.use('/', routes() );

//db 
db.sync()
    .then(()=> console.log('Conectado al servidor'))
    .catch(error => console.log(error));

//
app.listen(8080);
