# TRABAJO DE SISTEMAS DISTRIBUIDOS
## CONSTRUIDO CON HANDLEBARS, MONGO, NODE, EXPRESS, MULTER, PASSPORT, VALIDATOR, SWEETALERT2, AXIOS, FLASH ETC


Capturas del proyecto

<p align="center">  
  <img src="/public/img/CapturasReadme/Captura de pantalla (404).png" alt="CapturaP1" title="CapturaP1"  width="350">
  <img src="/public/img/CapturasReadme/Captura de pantalla (416).png" alt="CapturaP2" title="CapturaP2"  width="350">
  <img src="/public/img/CapturasReadme/Captura de pantalla (417).png" alt="CapturaP3" title="CapturaP3"  width="350">
  <img src="/public/img/CapturasReadme/Captura de pantalla (415).png" alt="CapturaP4" title="CapturaP4"  width="350">
  <img src="/public/img/CapturasReadme/Captura de pantalla (405).png" alt="CapturaP5" title="CapturaP5"  width="350">
  <img src="/public/img/CapturasReadme/Captura de pantalla (406).png" alt="CapturaP6" title="CapturaP6"  width="350">
  <img src="/public/img/CapturasReadme/Captura de pantalla (407).png" alt="CapturaP7" title="CapturaP7"  width="350">
  <img src="/public/img/CapturasReadme/Captura de pantalla (408).png" alt="CapturaP8" title="CapturaP8"  width="350">
  <img src="/public/img/CapturasReadme/Captura de pantalla (409).png" alt="CapturaP9" title="CapturaP9"  width="350">
  <img src="/public/img/CapturasReadme/Captura de pantalla (410).png" alt="CapturaP10" title="CapturaP10"  width="350">
  <img src="/public/img/CapturasReadme/Captura de pantalla (411).png" alt="CapturaP11" title="CapturaP11"  width="350">
  <img src="/public/img/CapturasReadme/Captura de pantalla (412).png" alt="CapturaP12" title="CapturaP12"  width="350">  
</p>

---------------------------------------------------------------------------------------------------------------------------------------

Cosas pendientes, notas y/o ideas:


- Pedir el token para cambio de password

- Mejorar la vista en responsive design, me basé en la pantalla mas pequeña del google chrome de escritorio pero en mi celu no se ve como me hubiera gustado que quedara

- Validar el trix para evitar palabras relacionadas con activacion de codigo javascript

- Agregar cositas chulas como la pagina 404. Fuente https://bluuweb.github.io/node/20-hbs/#each

- Buscar la manera de hacer funcionar el trix con multer para luego subir los archivos de forma local tal como se trabajó 
  en la subida de la foto de perfil del usuario (Si se puede claro, no hay mucha documentacion al respecto)

- si queda tiempo, validar para que cuando el usuario esté iniciado o no, no pueda ir atrás en las vistas pertinentes, debe salir una validacion mas o menos como esta:
  Actualmente ha iniciado sesión como xxxxx necesita salir antes de volver a entrar con un usuario diferente. (cerrar sesion o cancelar)

- Se considera la idea de quitar todos o algunos mensajes de exito que se producen con flash, al regresar atrás luego de tener exito
  en algun formulario o alguna acción, el mensaje vuelve a aparecer sin razón

- podria usar cloudinary para subir y administrar las imagenes. 

- Con los timestamps en la base de datos que he agregado en cada modelo, podria usarlos en lugar de enviar la fecha como lo tengo desde contacto.js, incluso
  con los timestamps está la posiblididad de jugar con la fecha de actualizacion.

- revisar errores visuales en mozilla firefox en la seccion de nuevo mensaje que se ve raro y el boton personalizado para editar perfil.
  Chrome y edge no tienen problema.

---------------------------------------------------------------------------------------------------------------------------------------
Control de versiones:

V2.3.8
- Version responsive corregida

V2.3.7
- Algunos cambios en el README.md y package.json para el despliegue en Heroku
  https://merengon-handlebars-proyect.herokuapp.com/

V2.3.6
- He puesto a funcionar el subir archivos atraves del trix. Para eso me tocó cambiar el limite de caracteres
  en dicho editor de texto en sus respectivas validaciones, ademas de añadir un js dedicado al trix.
- Se ha modificado la vista que muestra el mensaje de los contactos para adaptarlo a los mensajes largos que pueden llegar del trix
- Se ha comentado la mayoria de console logs para dejar todo limpio para la entregar del trabajo final

v2.3.5
- habia un error con validarEditarPerfil en editar perfil al momento de agregar el middleware subirImagen
  sin embargo coloqué este ultimo antes que validarEditarPerfil en las rutas, luego cuando hay errores, validarEditarPerfil 
  elimina la imagen que se ha subido localmente y que no alcanzó a guardarse en la base de datos
- Ahora cuando se sube una nueva imagen, la anterior se elimina localmente
- Arreglado un problemilla que cuando se eliminaba manualmente la imagen que se va a actualizar, arrojaba un error
  porque luego al hacer el proceso desde el codigo, no habia una imagen para borrar.
- En la vista del mensaje del contacto, el boton editar se muestra si y solo si el usuario que está en esa vista es el propietario 
  del mensaje en cuestion
- Corregido y agregado nuevos detalles visuales en algunas vistas. Entre lo que destaca es que en algunas secciones, si hay texto con
  palabras muy largas entonces se cortan y se les pone guion.
- Editar perfil ahora cuenta con el boton personalizado de subir imagen junto con a la actual del usuario.


v2.3.4
- Algunos efectos visuales corregidos en mi perfil
- Corregido el boton del navbar del perfil, ahora ya puede ocultarse al volver dar click sobre el
- Modal mejorado y ahora está en un partials con un css aparte para ser reutilizado en otras vistas
- En mas detalle de los mensajes, cada contacto ahora tiene un modal disponible para ver la foto de perfil
- Datatable mejorado en opiniones
- Mas info ha sido retocado
- Añadido evento resize para el menú desplegable responsive para que se cierre automaticamente si se cambia el tamaño de la pantalla
- Con if se ha solucionado un errorcito de value of null en editar mensaje en contacto.js para la fecha guardada
- Ahora solo el propietario del mensaje puede editarlo, los demás no podran ingresar a la edicion de dicho mensaje
- Corregido un detalle visual en el footer para el Firefox

v2.3.3
- Vistas mi perfil, el navbar y contacto ahora cuenta con soporte para mostrar la foto de perfil 
- Imagenes de perfil ahora se guardan localmente y se sube datos a la bd
- La imagen en mi-perfil se le ha añadido un modal
- Agregada una imagen estandard para los usuarios nuevos que no han subido foto de perfil
- Se ha hecho una revision a detalles de diseño en casi todas las vistas

v2.3.2
- Ahora los mensajes son eliminados en la base de datos
- Navbar full y responsive ahora incopora el espacio para la foto de perfil del usuario
- Los botones de perfil de usuario ahora se activan con click (antes funcionaban con mouseover pero como que no me convencia)
- Cambios esteticos menores del navbar y mi perfil

v2.3.1
- validado iniciar sesion y registrar usuario, cuando un usuario loggeado desea ir a estas rutas se va a redireccionar a la pagina principal
- corregido errores de inicializacion de algunas funciones en home (carrusel) y en nuevo mensaje (validacion de campos) (estaban disimulados con try catch en sus respectivos js)

v2.3.0
- Sección mi perfil ahora tiene una vista personalizada
- corregido pantalla opiniones cuando no hay mensajes
- titulo en editar mensaje se muestra correctamente
- colocado un icono en la pestaña del navegador
- Modificado los mensajes de alerta, se ha incrementado el tamaño del contenedor y la letra
- Añadadida la propiedad .sort( { 'fecha': -1 } ) en mi perfil. No funciona del todo bien en datatable. Tambien se ha agregado 
  timestamps en el modelo contactos por si acaso y se ha quitado el __v de dicho schema
- Ahora el datatable ordena de forma descendente segun las fechas. Se ha importado un nuevo cdn js y se ha editado el datatable.js
  esto funciona en conjunto con el sorting de mongoose.

v2.2.9
- Validacion para editar perfil habilitado
- añadida la validacion de contraseñas iguales en editar perfil siempre y cuando se escriba algo sobre password1, de lo contrario 
  los campos quedan vacios en el formulario y en la base de datos no sufren cambios
- Corregido editar perfil cuando se falla y se recarga la pagina, ahora los campos se completan de nuevo con lo que se pedia a la la base de datos
- Corregido editar mensajes cuando se falla y se recarga la pagina, ahora los campos se completan de nuevo con lo que se pedia a la base de datos
- La eliminacion del contenido html se realiza con axios y sweetAlert2 en la seccion de "mi perfil"
- sweet alert se ha personalizado un poco
- editar perfil ahora tiene el diseño de crear usuario
- de momento window.location.href = e.target.href; en app.js del codigo de axios se ha comentado porque generaba un error con el evento click en "mi perfil" ​ 
  GET http://localhost:5200/undefined 404 (Not Found) cuando se le da click en algo que no tenga una url especificada o sea el boton eliminar

v2.2.8
- Cerrar sesion disponible
- El codigo del rating para nuevo mensaje y editar mensaje ahora se renderiza desde un partials al igual que el navbar y el footer
- Validaciones y sanitizacion de todos los campos de mensaje y editar mensaje. (El trix no puede sanitizarse porque pierde algunas propiedades) 
- La redireccion de las validaciones de mensaje y editar mensaje ahora cada una y segun el caso, se conservan algunas propiedades de la pagina actual
- validar campo de usuario ahora cuenta con un limite de 50 caracteres porque tiene la opcion de escribir el nombre completo junto con su apellido

v2.2.7
- El botón para gestionar la sesion o el perfil ahora solo muestra la primer palabra del nombre del usuario
- Modificado campos contacto para que quede acorde al ejercicio de la clase
- cambiado el formato del date en opiniones y contacto con momentjs
- modificado el min height de algunas paginas e incrementado el height del footer
- Corregido bug grafico boton cerrar responsive
- Corregido el boton del menu principal en modo responsive, cuando no se habia iniciado sesion el boton no desplegaba el menú

v2.2.6
- Añadido y estilizado boton cerrar y editar perfil (responsive incluido)
- Se ha corregido algunos fallos cuando ingresa un usuario no registrado
  a las secciones donde el boton cerrar puede o no estar presente
- El nombre de la persona quien ha enviado un mensaje ahora puede 
  verse en las secciones de opiniones, contacto y editar contacto
- Iniciando cambios en el modelo de contactos, falta la parte visual


Versiones anteriores... Pues hasta hace poco se me ocurrió esta metodologia para llevar un control de versiones. Tarde pero seguro!


