//mongoose
const mongoose = require('mongoose');
require('./config/db');

//IMportacion de libreria para servidor
const { request } = require('express');
const express = require('express');
const router = require('./routes');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');

//Para firmar las sesiones y poderlas guardar en mongo
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const bodyParser = require('body-parser');

//Agregar librerías para Sanitizar datos de entrada
const expressValidator = require('express-validator');//se encarga de la sanitizacion
const flash = require('connect-flash');//toma los erroes y los muestra

const passport = require('./config/passport'); //autenticacion inicio de sesion, este es el archivo que se creó en config, no es una libreria

//Asociar las variables.env
require('dotenv').config({path:'variables.env'});

//Asociar express a una variable de trabajo local appHeladeria
const appHeladeria = express();

/* appHeladeria.use(bodyParser.json());
appHeladeria.use(bodyParser.urlencoded({extended:true})); */
appHeladeria.use(express.json());
appHeladeria.use(express.urlencoded({extended:true}));
/* appHeladeria.use(express.json({limit: '20mb'}));
appHeladeria.use(express.urlencoded({ extended: false, limit: '20mb' })); */



//Validación de campos expressvalidator / 6 de la librería este metodo cambia
appHeladeria.use(expressValidator());

//Asociar handlebars
appHeladeria.set('views', path.join(__dirname, 'views'));

appHeladeria.engine('handlebars', exphbs({
    defaultLayout:'layout', 
    helpers: require('./helpers/handlebars'), 
    layoutsDir: path.join(appHeladeria.get('views'), 'layouts'),
    partialsDir: path.join(appHeladeria.get('views'), 'partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

//Asociar las vistas de la aplicacion (handlebars)
appHeladeria.set('view engine', 'handlebars');

//Asociar carpeta public del css
appHeladeria.use(express.static(path.join(__dirname, 'public')));

//Abrir sesion con cookieParser, se hace control de la sesion
//eje definir tiempo de sesion conectado
appHeladeria.use(cookieParser());
appHeladeria.use(session({
    secret:process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:process.env.DATABASE}),
    unset: 'destroy'
}));
//Uso de passport
appHeladeria.use(passport.initialize());
appHeladeria.use(passport.session());

//Alertas y flash messages
appHeladeria.use(flash());//
//Crear nuestro middleware
appHeladeria.use((request, response, next)=> {//
    response.locals.mensajes = request.flash();//acá se guardan todos los errores
    response.locals.success_msg = request.flash('success_msg'); //aca se podria almacenar los mensajes correctos
    next();
});

//Construir el servidor
appHeladeria.use('/', router());

//Puerto para el servidor
appHeladeria.listen(process.env.PUERTO);