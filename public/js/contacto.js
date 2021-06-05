
const main_contacto_mensaje = document.querySelector(".main_contacto_mensaje");

if (main_contacto_mensaje) {
	/*-------------------------------------- CODIGO PARA VALIDAR CAMPOS CONTACTO  -------------------------------------- */

	const formulario = document.getElementById('formulario');
	const inputs = document.querySelectorAll('#formulario input'); //obtener un arreglo de todos los input, # es para acceder a un id
	const select = document.getElementById('asunto');
	const trix = document.getElementById('trix-editor');


	const expresiones = { //es un objeto expresiones (EXPRESIONES REGULARES) que tiene las sig propiedades:
		titulo: /^.{2,18}$/, // Letras, pueden llevar acentos.
		/* apellido: /^[a-zA-ZÀ-ÿ]{2,16}$/,
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, */
		mensaje: /^.{1,5000}$/,  //en el trix está el contenido html de mensaje y por eso en un principio se ocupa 11 caracteres + lo que se escriba
	}														//5000 porque el trix tiene imagenes y aumenta el tamaño

	const campos = { //es un objeto
		titulo: false,
		/* apellido: false,
		correo: false, */
		asunto: false,
		mensaje: false
	}

	const validarFormulario = (e) => {
		switch (e.target.name) { //busca los campos por name para validarlos en case de un switch con su breaks		
			case "titulo":
				//el input esta en e.target. esto tambien puede funcionar como e.target.name
				//el campo para este caso seria 'nombre' y se va a utilizar en la funcion validarCampo
				validarCampo(expresiones.titulo, e.target, 'titulo');
				break;
			/* case "apellido":
				validarCampo(expresiones.apellido, e.target, 'apellido');
				break;
			case "correo":
				validarCampo(expresiones.correo, e.target, 'correo');
				break; */
			case "asunto":
				validarSelect('asunto');
				break;
			case "mensaje":
				validarCampo(expresiones.mensaje, e.target, 'mensaje');
				break;
		}
	}

	const validarCampo = (expresion, input, campo) => { //se le pasan 3 valores, 

		if (expresion.test(input.value)) { //acceder al valor del input para comprobarlo con la expresion
			cambiosBordesMensajeCorrecto(campo);
			if (campo != 'mensaje') {
				cambiosIconosCorrectos(campo);
			}
		} else {
			cambiosBordesMensajeIncorrecto(campo);
			if (campo != 'mensaje') {
				cambiosIconosIncorrectos(campo);
			}
		}
	}

	//Validar Select:
	const validarSelect = (campo) => {

		if (select.selectedIndex == 0 || select.value == "disabled selected") {
			cambiosBordesMensajeIncorrecto(campo);
			//console.log(select.selectedIndex);
			//console.log(mensajeTrix);
		} else {
			cambiosBordesMensajeCorrecto(campo);
			/* console.log(select.selectedIndex);
			console.log(inputs);
			console.log(campo);
			console.log("el campo del select correcto " + campo); */
		}
	}
	/* --------------------------------------------- */

	const cambiosBordesMensajeCorrecto = (campoProvisional) => {
		document.getElementById(`grupo__${campoProvisional}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campoProvisional}`).classList.add('formulario__grupo-correcto');
		//para los mensajes de error
		document.querySelector(`#grupo__${campoProvisional} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campoProvisional] = true;//
	}

	const cambiosBordesMensajeIncorrecto = (campoProvisional) => {
		document.getElementById(`grupo__${campoProvisional}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campoProvisional}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campoProvisional} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campoProvisional] = false;
	}

	const cambiosIconosCorrectos = (campoProvisional) => {
		document.querySelector(`#grupo__${campoProvisional} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campoProvisional} i`).classList.remove('fa-times-circle');
	}

	const cambiosIconosIncorrectos = (campoProvisional) => {
		document.querySelector(`#grupo__${campoProvisional} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campoProvisional} i`).classList.remove('fa-check-circle');
	}



	//eventos al dar click y salir de una casilla del formulario:
	select.addEventListener('blur', validarFormulario);
	trix.addEventListener('blur', validarFormulario);


	inputs.forEach((input) => {
		input.addEventListener('keyup', validarFormulario); //keyup es para ejecutar una funcion cuando escribo algo y salgo de la casilla
		input.addEventListener('blur', validarFormulario); //blur es para comprobar

	});


	/* ------------------------------------funcion para el boton ----------------------------------------------------------------------------------------*/
	formulario.addEventListener('submit', (e) => { //e es un parametro
		//e.preventDefault(); //para acceder al parametro y el preventeDefault es para evitar que no cambie la pagina
		/* console.log(selectValor); */
		//console.log(select.selectedIndex);

		//console.log(campos.asunto);
		//formulario.addEventListener('DOMContentLoaded', validarFormulario, true); 


		//intentando solucionar un bug grafico al ejecutar todo en la pagina editar
		//pues la validacion como tal ahora lo hace el modelo
		//pero apesar de eso sigue apareciendo las alertas de mensaje erroneo o mensaje enviado
		const paginaActual = location.href;

		if (paginaActual.includes("editar")) {
			/* campos.nombre = true,
			campos.apellido = true,
			campos.correo = true,
			campos.asunto = true,
			campos.mensaje = true */

			validarCampo(expresiones.titulo, titulo, 'titulo');

			/*validarCampo(expresiones.apellido, apellido, 'apellido');

			validarCampo(expresiones.correo, correo, 'correo'); */

			validarSelect('asunto');

			validarCampo(expresiones.mensaje, mensaje, 'mensaje');
		}

		//console.log(formulario.href);
		//console.log(paginaActual);


		//console.log(campos.asunto);
		//comprobar que todo las casillas estan correctas y hacer algo, en este caso si todo está bien, todo se resetea
		if (campos.titulo && /* campos.apellido && campos.correo && */ campos.asunto && campos.mensaje) {
			//formulario.reset();
			//e.returnValue = true;



			const dateObjetc = new Date().getTime(); //getTime es para traer todos los numeros
			/* const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
 */

			/* accedo a elementos del objeto */
			/* let fecha =
				`${dateObjetc.getDate()} de ${months[dateObjetc.getMonth()]} de ${dateObjetc.getFullYear()} a las ${dateObjetc.getHours()}:${dateObjetc.getMinutes()}`; */
			//document.getElementById("demo").innerHTML = d.getDate() + " de " + months[d.getMonth()] + " de " + d.getFullYear();

			//const fechaArray = [...fecha]
			//let fecha = `${ dateObjetc.getDate()}-${dateObjetc.getMonth() +1}-${dateObjetc.getFullYear()}`;
			//dateObjetc.toDateString();

			const fechaGuardada = document.querySelector('#fecha');
			if (fechaGuardada) { //con este if soluciono un errorcito de value of null en editar mensaje
				fechaGuardada.value = dateObjetc; /* nota, esto solo se ejecuta cuando se envia un nuevo dato, al editar esto no se modifica y me parece bien dejarlo asi */
			}
			


			/* e.returnValue = true; */

			//mostrar mensaje de exito y que se elimine luego de 5 segundos
			document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
			setTimeout(() => {
				document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
			}, 10000);

			document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {// con esto tambien desaparecen todos los iconos al resetear la pagina
				icono.classList.remove('formulario__grupo-correcto');
			});

			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo'); //elimina mensaje de error si anteriormente se habia mostrado


		} else {
			document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo'); //si el usuario no llena todos los campos
			//e.returnValue = false;
		}
	});


	/*
	
	NOTAS:	
	
	se ha corregido el error validando directamente en el modelo contatcto.js	
	
	*/
}


