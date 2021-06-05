
const mongoose = require('mongoose');
require('../config/db');
const Contacto = mongoose.model('Contacto');

const moment = require('moment');
moment.locale('es-us');
/* esto es para enviar algo a contacto-mensaje */
exports.fomrularioContacto = (request, response) => {
    //response.send('Funciona');
    //response.render('nombredelavista o layout')

    const nombreUsuario = request.user.nombre.split(' ')[0];



    response.render('contacto-mensaje', {
        nombrePagina: 'Contactanos',
        cerrarSesion: true,
        nombreUsuario: nombreUsuario,
        usuario: request.user
        /*nombrepagina sobreescribe los valores de nombrepagina
        de la pagina inicial */
        /* 
         direccion: 'Centro Comercial San Juan Plaza Local 315 &#124; Calle 50 #18-23 Álamos Norte',
         imgTelefono:'imagenes/Iconos/2x/baseline_call_white_18dp.png',
         imgUbicacion:'imagenes/Iconos/2x/baseline_where_to_vote_white_18dp.png',
         imgFacebook: 'imagenes/Iconos/2x/facebook.png', */
    })
}

exports.agregarMensajeContacto = async (request, response) => {

    const contacto = new Contacto(request.body);

    contacto.author = request.user._id;

    contacto.etiquetas = request.body.etiquetas.split(',');

    //contacto.fecha = request.body.fecha.split(',');




    /* if (contacto.rating == "") {
        contacto.rating = "-"
        
    }

    if (contacto.etiquetas == "") {
        contacto.etiquetas = "-----------------"
    }
 */

    /*  console.log(contacto); */

    const nuevoMensaje = await contacto.save();/* esto redirecciona al detalle de lo que el contacto publicó */

    response.redirect(`/contacto/${nuevoMensaje.url}`)

}




exports.mostrarContacto = async (request, response, next) => {

    const contacto = await Contacto.findOne({ url: request.params.url }) /* :url es un comodin que viene del index routes y el url viene de la base de datos */
        .populate('author'/* , 'nombre','imagen' */);
    // nombre:request.user.nombre,  ES EL NOMBRE DE QUIEN INICIA SESION
    //console.log(contacto.fecha);
    const fecha = moment(contacto.fecha).format('LLLL');             /*  LLLL*/      /* LL */
    if (!contacto) return next();

    let renderContacto = {
        contacto,
        nombrePagina: `${contacto.titulo} `,
        fecha
    }

    if (!!request.user) {
        if (verificarAutor(contacto, request.user)) {
            renderContacto.mostrarBoton = true;
        } else {
            renderContacto.mostrarBoton = false;
        }        

        const nombreUsuario = request.user.nombre.split(' ')[0];

        renderContacto.usuario = request.user;
        renderContacto.cerrarSesion = true;
        renderContacto.nombreUsuario = nombreUsuario;
    }

    response.render('contacto', renderContacto)

}


/* resquest.params hace uso de la libreria bodyparser */
exports.formularioEditarContacto = async (request, response, next) => {
    const contacto = await Contacto.findOne({ url: request.params.url })
        .populate('author', 'nombre');
    // nomb
    if (!contacto) return next();

    const nombreUsuario = request.user.nombre.split(' ')[0];


    response.render('editar-contacto', {
        contacto,
        nombrePagina: `Editar - ${contacto.titulo} `,
        usuario: request.user,
        cerrarSesion: true,
        nombreUsuario: nombreUsuario,
    })


}


/* request.body empaqueta todo lo que está y lo trae
findOneanUpdate es el actualizar en la base de datos, que por cierto
ese parametro va a ser reemplazado mas adelante*/

exports.editarContacto = async (request, response) => {

    const contactoActualizado = request.body;

    contactoActualizado.etiquetas = request.body.etiquetas.split(',');

    /*  if (contactoActualizado.rating == "") {
         contactoActualizado.rating = "-"
         
     }
 
     if (contactoActualizado.etiquetas == "") {
         contactoActualizado.etiquetas = "-----------------"
     }
  */
     //Aqui se intentó validar al usuario propietario del mensaje
     //pero al utilizar la funcion de verificarAhthor, toma otros valores y para que funcione
     //toca crear una funcion similar pero para editar y listo

    //  const {id}= request.params;
    //  const contactoVerificar = await Contacto.findById(id);

    //  if(verificarAutor(contactoVerificar, request.user)){
    // const contacto = await Contacto.findOneAndUpdate({ url: request.params.url }, contactoActualizado, {
    //     new: true,
    //     runValidators: true
    // });

    // response.redirect(`/contacto/${contacto.url}`);
    // }else{
    // response.status(403).send('No tienes permiso para editar este mensaje!');
    // response.redirect(`/`);
    // }    


    /* --------------------------------- */
    const contacto = await Contacto.findOneAndUpdate({ url: request.params.url }, contactoActualizado, {
        new: true,
        runValidators: true
    }); 
    
     response.redirect(`/contacto/${contacto.url}`);
    


}


exports.validarMensajeContacto = async (request, response, next) => {
    //sanitizar campos
    request.sanitizeBody('titulo').escape(); //con esto se evitan ataques tipo sql injection y cosas similares
    request.sanitizeBody('asunto').escape();
    //request.sanitizeBody('mensaje').escape();
    request.sanitizeBody('etiquetas').escape();
    request.sanitizeBody('rating').escape();

    //validar   .withMessage('El email es incorrecto'), 
    request.checkBody('titulo').notEmpty().withMessage('Ingresar un titulo para el mensaje')
        .isLength({ min: 2, max: 18 }).withMessage('El titulo debe tener de 2 a 18 caracteres');
    request.checkBody('asunto', 'Selecciona el asunto')
        .not().isIn(['0', 'disabled selected']);
    request.checkBody('mensaje').notEmpty().withMessage('Escribe tu mensaje')
        .isLength({ min: 4, max: 5000 }).withMessage('El mensaje es demasiado largo'); //5000 porque el trix tiene imagenes y aumenta el tamaño
    request.checkBody('etiquetas', 'Selecciona alguna etiqueta').notEmpty();
    request.checkBody('rating', 'Calificanos con alguna estrella').notEmpty();

    const errores = request.validationErrors(); //convierte todos los errores en un arreglo

    let renderEditarContacto = {
        cerrarSesion: true,
    }

    const paginaActual = `${request.protocol}://${request.get("host")}${request.originalUrl}`;
    //console.log(paginaActual);  
    if (paginaActual.includes('contacto/mensaje')) {
        paginaRenderizada = 'contacto-mensaje';
        renderEditarContacto.nombrePagina = 'Contactanos';
    }
    else if (paginaActual.includes('contacto/editar')) {
        const contacto = await Contacto.findOne({ url: request.params.url })
            .populate('author', 'nombre');

        paginaRenderizada = 'editar-contacto';
        renderEditarContacto.contacto = contacto;
        renderEditarContacto.nombrePagina = `Editar - mensaje `;
    }


    if (errores) {
        request.flash('error', errores.map(error => error.msg));
        const nombreUsuario = request.user.nombre.split(' ')[0];

        renderEditarContacto.nombreUsuario = nombreUsuario;
        renderEditarContacto.mensajes = request.flash();

        response.render(paginaRenderizada, renderEditarContacto)

        return;
    }
    next();
}

exports.eliminarMensajeContacto = async (request, response) => {
    const { id } = request.params;  //del author de la vacante. request params es una peticion al servidor para que traiga el dato deseado

    //console.log('id es '+id);
    const contacto = await Contacto.findById(id);

    if (verificarAutor(contacto, request.user)) {
        contacto.remove();
        response.status(200).send('Mensaje eliminado correctamente');
    } else {
        response.status(403).send('Error no se ha podido eliminar el mensaje!');
    }
}


const verificarAutor = (contacto = {}, usuario = {}) => {
    if (!contacto.author.equals(usuario._id)) {
        return false;
    }

    return true;
}

/* module.exports = {
    verificarAutor
} */