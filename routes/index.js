//Importacion express para el control de rutas o URL
const { request, response } = require('express');
const express = require('express');

//Llamar al metodo que controla las rutas => router
const router = express.Router();

//Importar los controlador 
const homeController = require('../controllers/homeController');
const contactoController = require('../controllers/contactoController');
const opinionesController = require('../controllers/opinionesController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');


//Mejorar las peticiones al servidor
module.exports = () => {
  router.get('/', homeController.mostrarAlgo);

  router.get('/contacto/opiniones', opinionesController.mostrarOpiniones);

  router.get('/contacto/mensaje',
    authController.validarUsuario,
    contactoController.fomrularioContacto);

  router.post('/contacto/mensaje',
    authController.validarUsuario,
    contactoController.validarMensajeContacto,
    contactoController.agregarMensajeContacto); /* esto envia los datos a la base de datos, creo */

  router.get('/contacto/:url', contactoController.mostrarContacto); /* :url es un comodin  */


  //Editar contacto
  router.get('/contacto/editar/:url',
    authController.validarUsuario,
    authController.validarUsuarioGet,
    contactoController.formularioEditarContacto);

  //Guardar Edición
  router.post('/contacto/editar/:url',
    authController.validarUsuario,
    contactoController.validarMensajeContacto, //si falla no carga esa pagina y en su lugar redirecciona a contactanos
    contactoController.editarContacto);

  //Eliminar mensaje contacto
  router.delete('/contacto/eliminar/:id',
    authController.validarUsuario,
    contactoController.eliminarMensajeContacto);


  //Crear cuenta
  router.get('/crear-cuenta', authController.validarUsuarioLogeado,usuariosController.formCrearCuenta);

  //crear a la base de deatos los usuarios
  router.post('/crear-cuenta',authController.validarUsuarioLogeado, usuariosController.validarRegistro, usuariosController.crearUsuario);

  //Iniciar Sesión - Mostrar vista
  router.get('/iniciar-sesion',authController.validarUsuarioLogeado, usuariosController.formIniciarSesion);

  //Inciar Sesión - Validación passport - Post Autenticación
  router.post('/iniciar-sesion',authController.validarUsuarioLogeado, authController.autenticarUsuario);

  //Cerrar sesion
  router.get('/cerrar-sesion', authController.validarUsuario, authController.cerrarSesion);  

  //Panel de administración del perfil del usuario 
  router.get('/mi-perfil', /* 21/05/2021  */
    authController.validarUsuario,
    authController.mostrarPanel);


  //Editar Perfil
  router.get('/editar-perfil',
    authController.validarUsuario, /* 21/05/2021  */
    usuariosController.formEditarPerfil);

  router.post('/editar-perfil',
    authController.validarUsuario,
    usuariosController.subirImagen,
    usuariosController.validarEditarPerfil,
    usuariosController.editarPerfil);


  return router;
}