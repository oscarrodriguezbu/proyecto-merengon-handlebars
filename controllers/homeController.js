const mongoose = require('mongoose');
require('../config/db');
const Contacto = mongoose.model('Contacto');

const { request, response } = require("express");



//Creacion del metodo, acá está todo lo de las vistas
exports.mostrarAlgo = async (request, response) => {




    let renderhome = {
        nombrePagina: 'El Merengón Neiva',

        //esta seccion podria servir para guardar nombres de cosas que se repitan mas adelante como los helados
        helado1: 'Copa de Helado Especial',
        helado2: 'Banana Split en Canasta',
        helado3: 'Canasta Carnaval',
        helado4: 'Malteada de la Casa',
    }

    /*   if (!!request.user.nombre) {
          const renderHomeTrue = {
              ...renderhome,
              cerrarSesion: true,
              nombre: request.user.nombre,
          };
          response.render('home', renderHomeTrue);
      } */


    if (request.user) {
        const nombreUsuario =  request.user.nombre.split(' ')[0];
            
        renderhome.cerrarSesion = true;
        renderhome.nombreUsuario = nombreUsuario;
        renderhome.usuario= request.user;

        /* renderhome.nombre = request.user.nombre; */
    }

    //console.log(!!request.user);

    response.render('home', renderhome);
}



