
document.addEventListener('DOMContentLoaded', () => {
    //validaciones login
    let alerta = document.querySelector('.alerta');

    if (alerta) {
        limpiarAlertas();
    }

});

//Para gestionar las alertas
const limpiarAlertas = () => {
    const alertas = document.querySelector('.alertas'); //para dejar claro, en el css hay dos clases, alerta y alertas, hija y padre
   
    //console.log(alertas);
    const interval = setInterval(() => {
        /* console.log('xxx'); */
        if (alertas.children.length > 0) {

           /*  alertas.remove(alertas); */
          
            alertas.parentElement.removeChild(alertas);
            clearInterval(interval);
            /*  alertas.removeChild(alertas.children[0]); */
        } /* else if (alertas.children.length === 0) {

            alertas.parentElement.removeChild(alertas);
            clearInterval(interval);
        } */

    }, 3000);

}