//////////////event of submitt//////////////////////////////
const signInForm = document.querySelector('#siginform')
let emails;
let passwords;
const email = document.getElementById('inputEmail');
const password = document.getElementById('inputPassword');
signInForm.addEventListener('submit' , signInConfirm);
function signInConfirm(e){
    let checkRemember = document.getElementById('form_remebercheck');
    console.log(checkRemember);
    const rememberMe = document.getElementById('customCheck');
    if (rememberMe.checked ) {
        if(localStorage.getItem('passwords') === null && localStorage.getItem('emails') === null) {
            passwords;
            emails;
        }else {
            passwords = JSON.parse(localStorage.getItem('passwords'));
            emails = JSON.parse(localStorage.getItem('emails'));
        }
        passwords = password.value;
        emails = email.value;
        localStorage.setItem('passwords', JSON.stringify(passwords));
        localStorage.setItem('emails', JSON.stringify(emails));
    } else {
        localStorage.removeItem('passwords');
        localStorage.removeItem('emails');
        email.value = '';
        password.value = '';
    }
    location.href='../index.html';
    e.preventDefault();
}
/**************************retrieve data******************************/
passwords = JSON.parse(localStorage.getItem('passwords'));
emails = JSON.parse(localStorage.getItem('emails'));
email.value = emails;
password.value = passwords;
/****************************************************************/
$(document).ready(function () {
    var $container = $('.zoomIn');
    var $image = $container.find('.zoom');
    var $imageW = $image.width();
    var $imageH = $image.height();
    var $containerW = $container.innerWidth($imageW);
    var $containerH = $container.innerHeight($imageH);
    var $imageClone = $image.clone();
    var $imageLarge = $imageClone.width($imageW * 2);
    var imageLargeW = $imageLarge.width();
    var imageLargeH = $imageLarge.height();
    $image.width($imageW).height($imageH);
    $('.zoomIn').on({
      mouseenter: function () {
        $imageLarge.hide().prependTo($container).fadeIn(300);
      },
      mousemove: function (e) {
        var mouseX = e.pageX - $(this).offset().left;
        var mouseY = e.pageY - $(this).offset().top;
        var amountMovedX = Math.round(mouseX / $imageW * 100) / 100 * (imageLargeW - $imageW);
        var amountMovedY = Math.round(mouseY / $imageH * 100) / 100 * (imageLargeH - $imageH);
        $imageLarge.css({
          'top': amountMovedY + 'px',
          'left': -amountMovedX + 'px',
          'position': 'relative'
        });
      },
      mouseleave: function () {
        $imageLarge.remove();
      }
  });
  });
  /************************validation login form***********************/
  $('#siginform').validate({
    rules:{
      logemail:{
        required: true,
        email:true
      },
      logpassword:{
        minlength: 6,
        maxlength: 30,
        required: true,
        checkdigit: true
      }
    },
    highlight: function highlight(element) {
      $(element).addClass("attention");
    },
    unhighlight: function unhighlight(element) {
      $(element).removeClass("attention");
    }
  });
  /**********************validate register****************************/
  $.validator.addMethod("nowhitespace", function (value, element) {
    return this.optional(element) || /^\S+$/i.test(value);
  }, "No white space please");
  $('#registerform').validate({
    rules:{
      fname: {
        required: true,
        minlength: 2,
        lettersonly: true
      },
      lname:{
        required: true,
        minlength: 2,
        lettersonly: true
      },
      email:{
        required: true,
        email: true
      },
      password:{
        minlength: 6,
        maxlength: 30,
        required: true,
        checkdigit: true
      },
      phone:{
        required: true,
        nowhitespace:true,
        number: true ,
        minlength:11,
        maxlength:11
      }
    },
    highlight: function highlight(element) {
      $(element).addClass("attention");
    },
    unhighlight: function unhighlight(element) {
      $(element).removeClass("attention");
    }
  });