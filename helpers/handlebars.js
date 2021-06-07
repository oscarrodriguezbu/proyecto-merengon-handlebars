module.exports = {

    seleccionarEtiqueta: (seleccionadas = [], opciones) => {
        const etiquetas = ['Helado', 'Postre', 'Malteada', 'Fruta',
            'C.C. San Juan Plaza', 'Alamos Norte', 'Fechas especiales', 'Promociones'];

        let html = '';

        etiquetas.forEach(etiqueta => {
            html += `
                <li class="fix-texto-largo" ${seleccionadas.includes(etiqueta) ? 'class="activo"' : ''}>${etiqueta}</li>
            `;
        });

        return opciones.fn().html = html;
    },


    /* fn.this para llevar a la vista
    regexp es una expresion regular
    basicamente tipocontrato trabaja en el combobox */
    asuntoSeleccionado: (seleccionado, opciones) => {
        //console.log(seleccionado);
        return opciones.fn(this).replace(
            new RegExp(`value="${seleccionado}"`), '$& selected="selected"')


    },

    //Me pregunto si podré usar una validacion como vi en la seccion 21 del curso de react
    //muestra el objeto de los errores y las alertas del css
    mostrarAlertas: (errores = {}, alertas) => {
        //console.log(errores);
        /* 
||||||| error: [] es la categoria que el profe usa en el css para dibujar el color del error o posible campo correcto

        {
[0]   error: [
[0]     'El nombre es obligatorio',
[0]     'El email no es valido',
[0]     'El password no puede ir vacío',
[0]     'El password debe tener ocho caracteres, incluiyendo una letra mayúscula, un carácter especial y caracteres alfanuméricos',
[0]     'Confirmar Password no puede ir vacío'
[0]   ]
[0] }
        

[0]{ error: [ 'Este correo ya está registrado' ] }

        */


        /* console.log(errores);
        console.log(alertas.fn()); */
        /* console.log('===='); 
        console.log(alertas.fn());  */

        const categoria = Object.keys(errores); //trae cada categoria de los errores
        //console.log(categoria);

        let html = '';
        let htmlImg = '';

        if (categoria.length) {
            errores[categoria].forEach(error => {
                html += `<div class=' alerta'>${error}</div>`;
            })

            htmlImg = `<div class="alertas-contenedor ${categoria}">  ${html} <img src="/img/fondo/descarga.png" alt="Hola!" > </div> `;
        }
        return alertas.fn().html = htmlImg;

    },

    dateFormat: (date) => {
        const moment = require('moment');
        date = moment(date).format('YYYY/MM/DD');   /* YYYY/MM/DD  otra opcion LLLL*/
        return date;
    },
    dateFormatDos: (date) => {
        const moment = require('moment');
        date = moment(date).format('LL');  
        return date;
    }

}