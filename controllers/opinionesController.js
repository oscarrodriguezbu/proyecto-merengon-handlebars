const mongoose = require('mongoose');
require('../config/db');
const Contacto = mongoose.model('Contacto');

const moment = require('moment');

//Creacion del metodo, acá está todo lo de las vistas
exports.mostrarOpiniones = async (request, response, next) => {
    //const contactos = await Contacto.find({author: request.user._id});
    const contactos = await Contacto.find()
        .populate('author'/* , 'nombre' */).sort( { 'fecha': -1} );
     /* find para hacer un select */
    /* contactos.fecha = moment(contactos.fecha).format('YYYY/MM/DD');   */
    //console.log(fechaMoment);  
    //console.log(request.user.nombre);



    /*    contactos.forEach(contacto => {
          author =  usuario.nombre;
          
      });
   */


    if (!contactos) return next(); /* si no hay un comentario pase al siguiente midleware */

    /* nota, tal vez aquí pueda programar un boton de mostrar mas, que me muestre de 5 en 5 contactos o algo asi */

    /* o se me ocurre que podria con css limitar el alto de la pagina opiniones con un porcentaje y con un boton
    mostrar mas, hacer que ese porcentake aumente, la cuestion es que tocaria calcular con precision para que un contenedor
    no se muestre cortado, además en modo responsive este metodo puede ser un dolor de cabeza*/


    //contactos.fecha = contactos.fecha.getDate() + contactos.fecha.getMonth() + contactos.fecha.getFullYear();
    // let fechax = new Date(contactos.fecha);

    //console.log(this.fecha);

    // let mostrarFecha = fecha.getDate() + fecha.getMonth() + fecha.getFullYear();
    let renderOpiniones = {
        nombrePagina: 'Opiniones',
        contactos,
        //author: contacto.author
    }

    if (!!request.user) {
        const nombreUsuario =  request.user.nombre.split(' ')[0];
         
        renderOpiniones.usuario= request.user;
        renderOpiniones.cerrarSesion = true;
        renderOpiniones.nombreUsuario = nombreUsuario;
    }

    response.render('contacto-opiniones', renderOpiniones);
}