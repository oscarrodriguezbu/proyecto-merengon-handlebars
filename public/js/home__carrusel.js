

const homeCarrusel = document.getElementById("homeCarrusel");//con esto soluciono un error de inicializacion

if (homeCarrusel) {


  /* ---------Asuntos globales----------------- */

  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("punto-carrusel");
  //console.log(slides);
  let i;
  /* console.log(dots.length); */

  const ejecutarCiclo = () => {
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  }

  const generarCambios = (m) => {
    slides[m - 1].style.display = "block";
    dots[m - 1].className += " active";
    /* console.log(m); */
  }

  /* -----------------------Carrusel Automatico  ---------------------------------     */
  let slideIndex_automatic = 0;
  showSlides__automatico();

  function showSlides__automatico() {
    ejecutarCiclo();
    slideIndex_automatic++;
    if (slideIndex_automatic > slides.length) { slideIndex_automatic = 1 }
    generarCambios(slideIndex_automatic);
    setTimeout(showSlides__automatico, 5000); // Change image every 5 seconds
    /* console.log(showSlides__automatico); */
  }

  /*  -----------------------cambiar manualmente ---------------------------------  */
  let slideIndex = 2;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  function showSlides(n) {
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    ejecutarCiclo();
    generarCambios(slideIndex);
    /*  console.log(slideIndex);
    */

  }

}

