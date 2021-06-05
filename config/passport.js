//orquesta las vistas, las rutas, etc

const passport = require('passport'); //es la puerta donde ingresan los datos
const LocalStrategy = require('passport-local').Strategy; //envia datos a comparar y hacer autenticaion
const mongoose = require('mongoose');//el ORM o algo asi
const Usuarios = mongoose.model('Usuarios');
//const Usuarios = require('../models/Usuarios');


passport.use(new LocalStrategy({ //email y password vienen del name en iniciar-sesion
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //esto mas el requeste acontinuacion junto con  request.flash('error', 'Usuario no existe!' )) solucionan el problema del envio de los mensajes de errores
}, async (request, email, password, done) => { //done es como un next, cuando termina, salta a otro midleware
    const usuario = await Usuarios.findOne({ email });

    if (!usuario) return done(null, false, request.flash('error', 'Usuario no existe!'));
    //el mensaje lo muestra con ayuda de connect flash   

    const verificarPass = usuario.compararPassword(password); //compararPassword viene del modelo

    if (!verificarPass) return done(null, false, request.flash('error', 'Password incorrecto!'));

    /* return done(null, usuario, { message: "Success!" }); */ //salta al siguiente middleware donde carga el usuario
    return done(null, usuario, request.flash('success_msg', 'Bienvenido!'));
}));


//metodos obligatorios: serializar y deserializar para controlar la sesion del usuario en la aplicacion
//
passport.serializeUser((usuario, done) => done(null, usuario._id)); //con otras base de datos como postgres o mysql, lo unico que cambia es _id por id

passport.deserializeUser(async (id, done) => { //carga la sesion
    const usuario = await Usuarios.findById(id);
    //console.log(usuario);
    return done(null, usuario);
});

module.exports = passport; //exporta el usuario