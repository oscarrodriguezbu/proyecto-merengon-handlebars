/* 
NOTA:
APP.JS VIENE DEL DIST DEL WEBPACK Y AL PARECER TIENE LA POSIBLIDAD DE HACER IMPORTACIONES CON IMPORT Y REQUIRE.
NO OBSTANTE HE CREADO MUCHOS JS APARTE PARA LEER EL CODIGO MEJOR Y ESPERO QUE ESTO NO AFECTE EL RENDIMIENTO DE LA APLICACIÓN
PORQUE PUEDE LLEGAR A CONSIDERARSE UNA MALA PRACTICA.

EL CODIGO DE AXIOS Y SWEETALERT NECESARIAMENTE DEBE CORRER ACÁ Y NO EN UN ARCHIVO APARTE

*/


//alert('Hola');
const { set } = require("mongoose");

/*-------------------------------------- CODIGO PARA LAS LISTAS  -------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {  /* evento para los botones en las listas */
    const etiquetas = document.querySelector('.formulario__lista__etiquetas');
    if (etiquetas) {
        etiquetas.addEventListener('click', agregaretiquetas);
        etiquetasSeleccionadas();
    }
});
/* sets se encarga de guardar el elemento en forma de arreglo */
const etiquetas = new Set();
const agregaretiquetas = e => {

    if (e.target.tagName === 'LI') {
        if (e.target.classList.contains('activo')) {
            //quitar el set y la clase para desmarcar
            etiquetas.delete(e.target.textContent); //tambien quita el texto
            e.target.classList.remove('activo');

        } else {
            //agregar el set y la clase
            etiquetas.add(e.target.textContent);
            e.target.classList.add('activo');
        }
    }

    // console.log(etiquetas);
    const etiquetasArray = [...etiquetas]; //para convertir objeto set en arreglo
    document.querySelector('#etiquetas').value = etiquetasArray; //apunta al id del campo oculto
};

/* array.from convierte en arreglo */
const etiquetasSeleccionadas = () => {
    const seleccionadas = Array.from(document.querySelectorAll('.formulario__lista__etiquetas .activo'));
    //console.log(seleccionadas);

    seleccionadas.forEach(seleccionada => {
        etiquetas.add(seleccionada.textContent);
    })

    const etiquetasArray = [...etiquetas];   /* esto convierte a arreglo pero si va con {...etiquetas} se crea un clon del objeto */
    document.querySelector('#etiquetas').value = etiquetasArray;
};

/*-------------------------------------- CODIGO PARA EL RATING CON ESTRELLAS  -------------------------------------- */

const stars = document.querySelectorAll('.valor__estrella');

/* stars.forEach(element => {
    //console.log(element.getAttribute("data-rate"));
    //console.log(element);
    element.addEventListener('click', showRating);
}); */

stars.forEach(element => {
    //console.log(element.getAttribute("data-rate"));
    //console.log(element);
    ["click", "DOMContentLoaded"].forEach(function (e) {
        element.addEventListener(e, showRating);
    })
});

function showRating(e) {
    const starValue = e.target.getAttribute("data-rate");

    //console.log(e.target.outerHTML);
    document.querySelector('#rating').value = starValue;
    //console.log("Your rated this " + starValue + " stars.");

    /*  if (type === 'DOMContentLoaded') {
         if (indexNumber < starValue) {
             elemnto.classList.add("orange");
         } else {
             elemnto.classList.remove('orange');
         }
     } */
}

/*-------------------------------------- CODIGO PARA LA ELIMINACION DE CAMPOS EN AXIOS Y  SWEETALERT2-------------------------------------- */

import axios from 'axios';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {

    const mensajesListado = document.querySelector('.panel-administracion');

    if (mensajesListado) {
        mensajesListado.addEventListener('click', accionesListado);
    }
});

const accionesListado = e => {
    // e.preventDefault();
    // console.log(e.target);
    if (e.target.dataset.eliminar) { //viene de  data-eliminar={{id}} del panel de admin vista
        e.preventDefault();

        Swal.fire({
            title: '¿Está seguro que desea eliminar el mensaje?',
            text: "Luego no podrás revertir esto!",
            icon: 'warning',
            confirmButtonColor: '#00ad6a',
            confirmButtonText: 'Si, sin miedo!',
            showCancelButton: true,
            cancelButtonColor: '#fb6376',
            cancelButtonText: 'No, mejor no!',

        }).then((result) => {
            if (result.isConfirmed) {

                //url para eliminar
                const url = `${location.origin}/contacto/eliminar/${e.target.dataset.eliminar}`; //origin para traer la ubicacion del servidor
                //console.log(url);

                //axios
                axios.delete(url, { params: { url } })
                    .then(function (respuesta) {
                        //console.log(respuesta);
                        if (respuesta.status === 200) { //200 es satisfactorio
                            /* Swal.fire(
                                'Borrado!',
                                'Tu mensaje ha sido eliminado.',
                                'success',
                                '#00ad6a',
                            ); */

                            Swal.fire({
                                title: 'Borrado!',
                                text: 'Tu mensaje ha sido eliminado.',
                                icon: 'success',
                                confirmButtonColor: '#00ad6a'
                            });

                            respuesta.data;
                            //eliminar la vacante del dom
                            //muchos parent element por la distribucion de las cajas en el html, busca al contenedor padre para que elimine a los hijos
                            e.target.parentElement.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement.parentElement);
                            //en este caso, me tocó colocar data-eliminar en el i para que el valor sea detectado en el url
                        }
                    });
            }
        })
    } else if (e.target.tagName === 'A') {

        window.location.href = e.target.href;
        //window.location.href = e.target.href;
        /* console.log(window.location.href);
        console.log(!`${location.origin}/contacto/eliminar/${e.target.dataset.eliminar}`); */
    }
}
/* -------------------------------modal imagen en mi perfil----------------------------------- */
// Get the modal
const modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
const img = document.getElementById('myImg');
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");


if (img) {

    img.addEventListener('click', ()=> {
        //console.log(img);
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
        document.querySelector('body').style.overflow = 'hidden';
    });
    /* img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    } */

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
   /*  span.onclick = function () {
        modal.style.display = "none";
    } */
    span.addEventListener('click', ()=> {
        modal.style.display = "none";
        document.querySelector('body').style.overflow = 'visible';
    });
}

/* -------------------------------TRIX SUBIR ARCHIVOS------------------------------------- */

/* const trixPDF = document.getElementById('mensaje');
trixPDF.addEventListener("trix-attachment-add", event => {
    let attachment = event.attachment;
    if (attachment.file) {
        trixPDF.uploadImage(attachment);
    }
  });

  const uploadImage = (attachment) => {
    let imageFormObj = new FormData();
    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", attachment.file);
    axios.post('/images/upload', imageFormObj)
      .then((data) => {
        if (data.data.success) {
          let imageURL = data.data.image.data;
          attachment.setAttributes({
            url: '/' + imageURL
          })
        }
      });
    } */