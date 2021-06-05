// Agregar clase activo a la pagina actual en el menu del header
let header = document.getElementById("header_menu");
let btns = document.getElementsByClassName("header__pagina_actual");
const paginaActual = location.href;
const btnsLenght = btns.length;

/* console.log(paginaActual); */
/* const cosita = [...btns];

console.log("conversion a array " + cosita); */

for (let i = 0; i < btnsLenght; i++) {

	// If there's no active class
	if (btns[i].href === paginaActual) {
		btns[i].className += " activo";
		/* console.log(btns[i].href); */
		/*
				console.log("numero en i " + i);
				console.log("elemento array en i con href " + cosita[i].href);
				console.log("btns original " + btns);
		
				console.log("btns 0 " + btns[0]);//este es el problema
				console.log("btns 1 " + btns[1]);//este es el problema
				console.log("btns en i " + btns[i]);//este es el problema
				console.log("la pagina actual es " + paginaActual);
		
				console.log("numero de elementos" + btnsLenght);
				console.log("el this " + this.className); */

	}
}


/* -------------------------------------------------menu desplegable perfil y cerrar sesion ----------------------------------------------- */
const btnPerfil = document.getElementById('btn-perfil-usuaro'),
	span = document.getElementById('btn-perfil-usuaro-span'),
	icono = document.getElementById('btn-perfil-usuaro-icono'),	
	categoriaPerfil = document.getElementById('categoria-perfil'),

	/* event.target.classList.contains("btn-perfil-usuaro-responsive") es mejor y podria optimizar el codigo con esto pero me da pereza */
	/* btnPerfilResponsive = document.getElementById('btn-perfil-usuaro-responsive'), */
	btnPerfilResponsive = document.querySelector('.btn-perfil-usuaro-responsive'),	
	categoriaPerfilResponsive = document.getElementById('categoria-perfil-responsive'),
	
	esDispositivoMovil = () => window.innerWidth <= 768; /* la funcion en una sola linea de codigo para que retorne falso o verdadero */

if (!!categoriaPerfil) {


	//window.addEventListener('mouseover', (event) => { /* funcion para activar el boton al pasar encima de el */

	/* //console.log(event.target);
	if (event.target == btnPerfil) {
		if (!esDispositivoMovil()) { 
			categoriaPerfil.classList.add('categorias_activo');
			const interval = setInterval(() => {
				categoriaPerfil.classList.remove('categorias_activo');
				clearInterval(interval);
			}, 1000);
		}
	}
*/

	/* 	if (event.target !== categoriaPerfil) {
			if (categoriaPerfil.classList.contains('categorias_activo')) {
				const interval = setInterval(() => {
					categoriaPerfil.classList.remove('categorias_activo');
					clearInterval(interval);
				}, 1000);
	
			} 
		}
 */


	/* 	if (event.target == btnPerfilResponsive) {
			categoriaPerfilResponsive.classList.add('categorias_activo');
			const interval = setInterval(() => {
				categoriaPerfilResponsive.classList.remove('categorias_activo');
				clearInterval(interval);
			}, 1000);
		} */

	//});

	categoriaPerfil.addEventListener('mouseleave', () => { /* lo mismo de la anterior pero se quita el activo cuando el cursor esté fuera */
		categoriaPerfil.classList.remove('categorias_activo');
	});

	categoriaPerfilResponsive.addEventListener('mouseleave', () => { /* lo mismo de la anterior pero se quita el activo cuando el cursor esté fuera */
		categoriaPerfilResponsive.classList.remove('categorias_activo');
	});


	window.addEventListener('click', (event) => {
		if (event.target !== categoriaPerfil) {
			if (event.target == btnPerfil || event.target == span || event.target == icono) {
				if (categoriaPerfil.classList.contains('categorias_activo')) {
					categoriaPerfil.classList.remove('categorias_activo');

				} else {
					categoriaPerfil.classList.add('categorias_activo');
				}
			} else {
				categoriaPerfil.classList.remove('categorias_activo');
			}
		}


		/* Responsive button */
		if (event.target !== categoriaPerfilResponsive || event.target.classList.contains("btn-perfil-usuaro-responsive")) {
			if (event.target.classList.contains("btn-perfil-usuaro-responsive")) {
				if (categoriaPerfilResponsive.classList.contains('categorias_activo') ) {
					categoriaPerfilResponsive.classList.remove('categorias_activo');

				} else {
					categoriaPerfilResponsive.classList.add('categorias_activo');
				}
			} else {
				categoriaPerfilResponsive.classList.remove('categorias_activo');
			}
		}

		/* if (event.target !== categoriaPerfilResponsive) {
			categoriaPerfilResponsive.classList.remove('categorias_activo');
		} */
	});

}



/* -----------------------------------------------------------------------------menu desplegable responsive----------------------------------- */

const contenedorEnlacesNav = document.querySelector('#header_menu .contenedor-enlaces-nav');


// EventListeners para dispositivo movil.
document.querySelector('#btn-menu-barras').addEventListener('click', (e) => {
	/* e.preventDefault(); */
	if (contenedorEnlacesNav.classList.contains('activo')) {
		contenedorEnlacesNav.classList.remove('activo');
		document.querySelector('body').style.overflow = 'visible'; /* esto es para evitar que se haga scroll verticalmente */
	} else {
		contenedorEnlacesNav.classList.add('activo');
		document.querySelector('body').style.overflow = 'hidden';
	}
});



window.addEventListener('resize', (e) => {
	if ( !esDispositivoMovil()) {
		if (contenedorEnlacesNav.classList.contains('activo')) {
			contenedorEnlacesNav.classList.remove('activo');
			document.querySelector('body').style.overflow = 'visible'; /* esto es para evitar que se haga scroll verticalmente */
		} 
	}
});

