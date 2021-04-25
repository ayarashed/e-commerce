/*document.onreadystatechange = function() { 
  if (document.readyState !== "complete") { 
      document.querySelector( 
        "body").style.visibility = "hidden"; 
      document.querySelector( 
        "#loader").style.visibility = "visible"; 
  } else { 
      document.querySelector( 
        "#loader").style.display = "none"; 
      document.querySelector( 
        "body").style.visibility = "visible"; 
  } 
};*/

$(document).ready(function () {
 $(".main-slider.owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  dots: false,
  autoplay: true,
  responsive: {
   0: {
    items: 1,
   },
   300: {
    items: 2,
   },
   600: {
    items: 3,
   },
   1000: {
    items: 4,
   },
  },
 });
});
