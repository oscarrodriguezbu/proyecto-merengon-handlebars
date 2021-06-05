
const mongoose = require('mongoose');
require('../config/db');
const Contacto = mongoose.model('Contacto');

const passport = require('passport');



exports.autenticarUsuario = passport.authenticate('local', { //muestra las alertas del login. El local recibe el usuario y la contraseña de forma tradicional
    successRedirect: '/mi-perfil',
    failureRedirect: '/iniciar-sesion', //redirecciona si el login es incorrecto
    failorFlash: true, //muestran los mensajes de errores 
    successFlash: true, // SE MUESTRA PERO LUEGO DE CARGAR LA SIGUIENTE PAGINA
    badRequestMessage: 'Missing username or password.'

})/* , function(req, res) {
    req.flash('mensajeRegistro','Graciasu cuenta, ahora estas autentificado.');
}; */


exports.mostrarPanel = async (request, response) => {  /* 21/05/2021  */
    const contactos = await Contacto.find({ author: request.user._id }).sort({ 'fecha': -1 });
    //console.log(vacantes);

    const nombreUsuario = request.user.nombre.split(' ')[0];
    const nombreUsuarioCompleto = request.user.nombre;

    response.render('mi-perfil', {
        nombrePagina: 'Mi perfil',
        cerrarSesion: true,
        nombreUsuario: nombreUsuario,
        nombreUsuarioCompleto,
        contactos,
        usuario: request.user,
    });
}
/* 
colocar esto en todos los formularios que tengan render
        cerrarSesion: true,
        nombre:request.user.nombre,
*/

exports.validarUsuario = (request, response, next) => {
    if (request.isAuthenticated()) { //isAuthenticated trabaja directamente con passport
        return next();
    }
    //request.session.destroy();
    response.redirect('/iniciar-sesion'); //caso contrario    
}

exports.validarUsuarioGet = async(request, response, next) => {  

    const contactoUrl = await Contacto.findOne({ url: request.params.url }) /* es la url a la que quiere ingresar */
    .populate('author');

    //const { id } = request.params;  
    //console.log(id);
    
    /* console.log(typeof contactoUrl.author._id);
    console.log(request.user._id);
    console.log(contactoUrl.author._id); */
    if (!contactoUrl.author.equals(request.user._id)  ) { //el orden y ! importan para tener el resultado deseado
        //response.status(403).send('No tiene permiso para ingresar a esta página!');
        response.redirect('/');
        request.flash('error', 'No tiene permiso para ingresar a esta página!');
    } else { 
        return next();
    }     
}



exports.validarUsuarioLogeado = (request, response, next) => {
    if (request.isAuthenticated()) { //isAuthenticated trabaja directamente con passport        
        response.redirect('/');
    } else {
        return next();//caso contrario
    }
}


//cerrar sesion
exports.cerrarSesion = (request, response, next) => {
    //passport.authenticate('basic', { session: false }),
    /*  request.session.destroy(function (err) {
         if (err) { return next(err); }
         // The response should indicate that the user is no longer authenticated.
         return response.send({ authenticated: request.isAuthenticated() });
     }); */
    request.logout();
    request.flash('success_msg', 'Cerraste sesión correctamente');
    /*  if (!request.user) 
     response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate'); */
    return response.redirect('/iniciar-sesion');
}