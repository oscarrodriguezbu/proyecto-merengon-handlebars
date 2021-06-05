
const mongoose = require('mongoose');
require('../config/db');

const multer = require('multer');
const shortid = require('shortid'); //SIRVE PARA RENOMBRAR LAS IMAGENES CON NOMBRES ALEATORIOS

const Usuarios = mongoose.model('Usuarios');

//------------------------------------------- crear cuenta vista -------------------------------------------
exports.formCrearCuenta = (request, response) => {
    response.render('crear-cuenta', {
        nombrePagina: 'Registro de usuario',

    })
}



exports.validarRegistro = (request, response, next) => {
    //Sanitizar, los campos vienen del name en crear-usuario
    request.sanitizeBody('nombre').escape();//scape convierte a string
    request.sanitizeBody('email').escape();
    request.sanitizeBody('password').escape();
    request.sanitizeBody('confirmar').escape();
    //validar
    request.checkBody('nombre', 'El nombre es obligatorio').notEmpty();
    request.checkBody('nombre', 'El nombre debe tener de 2 a 50 caracteres').isLength({ min: 2, max: 50 })
    request.checkBody('email', 'El email no es valido').isEmail();
    request.checkBody('password', 'El password no puede ir vacío').notEmpty();
    /* request.checkBody('password', 'El password debe tener minimo 8 caracteres').isLength({ min: 8 }); */
    /*  request.checkBody('password', 'El password debe tener numeros').matches(/\d/);   */
    request.checkBody('password',
        'El password debe tener ocho caracteres, incluiyendo una letra mayúscula, un carácter especial y caracteres alfanuméricos')
        .matches(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/);
    request.checkBody('confirmar', 'Confirmar Password no puede ir vacío').notEmpty();
    request.checkBody('confirmar', 'El Password es diferente').equals(request.body.password);

    //todos los mensajes de error se muestran pero solo los que estan con .notEmty son los unicos que impiden el envio de datos a la bd

    const errores = request.validationErrors();

    // console.log(errores);

    //validar errores
    if (errores) {

        /* req.flash requiere 2 parámetros, el primero es la variable del mensaje y el segundo es el texto que se mostrara.  */
        //ESTO SE ENVIA AL HANDLEBAR, error es la categoria y errores es el arreglo con todos los mensajes de de error de la validacion anterior
        request.flash('error', errores.map(error => error.msg));

        //el llamado del helper lo tengo en cada uno de las siguientes vistas:
        response.render( //renderiza los errores en crear-cuenta
            'crear-cuenta', {
            nombrePagina: 'Registro de usuario',
            mensajes: request.flash(),
        }
        );

        /*    
       response.render( //renderiza los errores en INICIAR SESION POR SI ACASO
           'iniciar-sesion', {
           nombrePagina: 'Iniciar Sesión',
           mensajes: request.flash(),
       }
       ); 
       
       //NOTA: 
        // AL AGREGAR ESTO ME SALE UN ERROR Y SE BLOQUEA LA VENTANA ENTONCES SOLO SE DEJARIA EL RENDER EN CREAR-CUENTA
       //SI LO PONGO EN EL LAYOUT PRINCIPAL ENTONCES ME TOCA CALCULAR MANUALMENTE LA UBICACION DEL MENSAJE DE ALERTA QUE HE PERSONALIZADO

       */


        /* return; */
        return;
    }

    //si no hay errores pasa a guardar o eso pensaba, pero luego tocó hacer una condicional en crearUsuario para que todo funcione
    next(); //para pasar al siguiente middleware en las rutas, en este caso, salta a crearUsuario
}

//requestbody coge todo y se lo lleva en un objeto y lo convierte a string para poder guardar, viene del bodyparser
exports.crearUsuario = async (request, response, next) => {

    const usuario = new Usuarios(request.body);

    //console.log(usuario);

    const errores = request.validationErrors();

    if (!errores) {
        try {
            await usuario.save();
            request.flash('success_msg', 'Cuenta creada exitosamente!');
            response.redirect('/iniciar-sesion');

        } catch (error) {
           // console.log(error);
            request.flash('error', error);
            response.redirect('/crear-cuenta');
        }
    }


    /*   //validar errores
       if (!errores) {
   
           const nuevoUsuario = await usuario.save();
   
           if (!nuevoUsuario) return next();
           response.redirect('/iniciar-sesion');
       } */


    /* 
        try {
            nuevoUsuario;
            response.redirect('/iniciar-sesion');
    
        } catch (error) {
            console.log(error);
            request.flash('error', error);
            response.redirect('/crear-cuenta');
        }
     */


    /*   try {
          await usuario.save();
          response.redirect('/iniciar-sesion');
  
      } catch (error) {
          console.log(error);
          request.flash('error', error);
          response.redirect('/crear-cuenta');
      }
   */

}


//------------------------------------------- iniciar sesion vista -------------------------------------------
exports.formIniciarSesion = (request, response) => {


    response.render('iniciar-sesion', {
        nombrePagina: 'Iniciar Sesión',

    });

}


//------------------------------------------- Editar perfil vista -------------------------------------------

//abrir la pagina y pasar valores
exports.formEditarPerfil = (request, response) => { /* 21/05/2021  */

    const usuario = Usuarios.findById(request.user._id);
    //console.log(usuario.nombre);

    const nombreUsuario = request.user.nombre.split(' ')[0];

    response.render('editar-perfil', {
        nombrePagina: 'Edita tu perfil',
        usuario: request.user,
        cerrarSesion: true,
        nombreUsuario: nombreUsuario,
    });
}

//interaccion con la base de datos save
exports.editarPerfil = async (request, response) => {

    const usuario = await Usuarios.findById(request.user._id);

    //console.log(usuario);


    if (request.body.nombre) {
        usuario.nombre = request.body.nombre;
    }
    if (request.body.email) {
        usuario.email = request.body.email;
    }
    if (request.body.password) {
        usuario.password = request.body.password; //colocar dos campos de contraseña?
    }

    if (request.file) {
        usuario.imagen = request.file.filename;
    }

    await usuario.save();


    request.flash('success_msg', 'Cambios guardados correctamente');

    response.redirect('/mi-perfil');
}




exports.validarEditarPerfil = async (request, response, next) => {
    const usuario = await Usuarios.findById(request.user._id);
    //console.log(usuario.imagen);
    const fs = require('fs-extra'); //Para eliminar archivos locales asincronos
    //Sanitizar, los campos vienen del name en crear-usuario
    if (request.body.nombre) {
        request.sanitizeBody('nombre').escape();
    }
    if (request.body.email) {
        request.sanitizeBody('email').escape();
    }
    if (request.body.password) {
        request.sanitizeBody('password').escape();
        request.sanitizeBody('confirmar').escape();
    }


    //validar    
    request.checkBody('nombre', 'El nombre es obligatorio').notEmpty();
    request.checkBody('nombre', 'El nombre debe tener de 2 a 50 caracteres').isLength({ min: 2, max: 50 })
    request.checkBody('email', 'El email no es valido').isEmail();
    if (request.body.password) {
        //request.checkBody('password', 'El password no puede ir vacío').notEmpty();
        request.checkBody('password',
            'El password debe tener ocho caracteres, incluiyendo una letra mayúscula, un carácter especial y caracteres alfanuméricos')
            .matches(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/);
        //request.checkBody('confirmar', 'Confirmar Password no puede ir vacío').notEmpty();
        request.checkBody('confirmar', 'El Password es diferente').equals(request.body.password);
    }


    const errores = request.validationErrors();
    //const path = `../../public/uploads/perfiles`;
    //validar errores
    if (errores) {

        //Si las validaciones anteriores impiden continuar, entonces se elimina la foto guardada localmente
        if (request.file) {
        await fs.unlink(__dirname + '../../public/uploads/perfiles/' + request.file.filename, function (err) {
            // if (err) throw err;
            console.log('Imagen borrada localmente!');
        }); //elimina las imagenes en la carpta publica 
        }
        request.flash('error', errores.map(error => error.msg));

        const nombreUsuario = request.user.nombre.split(' ')[0];

        response.render('editar-perfil', {
            nombrePagina: 'Edita tu perfil',
            usuario: request.user,
            cerrarSesion: true,
            nombreUsuario: nombreUsuario,
            mensajes: request.flash(),
        });
        return;
    }

    const ruta = __dirname + '../../public/uploads/perfiles/' + usuario.imagen;
    if (request.file) {//valida en caso de que no quiera actualizar la foto
    await fs.unlink(ruta, function (err) {
        //if (err) throw err;
        console.log('Imagen actualizada, la anterior ha sido borrada localmente!');
    });
    }

    next();
}

//------------------------------------------- Subir imagen -------------------------------------------
exports.subirImagen = (request, response, next) => {

    upload(request, response, function (error) {
        if (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    request.flash('error', 'El archivo es muy grande, máximo 10MB');
                } else {
                    request.flash('error', error.message);// es como para que continue rastreando y guardando los errores posteriores
                }
            } else {
                request.flash('error', error.message);
            }
            response.redirect('/mi-perfil');
            return;
        } else {
            return next();
        }
    });
}
const configuracionMulter = {
    limits: { fileSize: 10000000 },
    storage: fileStorage = multer.diskStorage({
        destination: (request, file, cb) => {
            cb(null, __dirname + '../../public/uploads/perfiles'); //CB ES CALLBACK
        },
        filename: (request, file, cb) => {
            const extension = file.mimetype.split('/')[1]; //POSICION 0 EL NOMBRE DE LA IMAGEN Y 1 ES LA EXTENSION
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(request, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') { //mimetype es como la extension de los archivos, buscar documentacion para mas info
            cb(null, true);
        } else {
            cb(new Error('El formato de la imagen no es valido'), false);
        }
    }

}

const upload = multer(configuracionMulter).single('imagen');