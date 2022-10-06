/*====================================
** CUSTOM SCRIPTS BY @WEBOZZA
====================================*/
$ = jQuery;

setTimeout(() => {
  // Login/Register Error Message Position
  var errorMsg = $(".woocommerce-error").text();
  var theMsg = $(".woocommerce-error");

  if (errorMsg.indexOf("username") > -1 || errorMsg.indexOf("Username") > -1) {
    $("input#username").parent().append(theMsg);
  } else if (
    errorMsg.indexOf("password") > -1 ||
    errorMsg.indexOf("Password") > -1
  ) {
    $(".password-input").parent().append(theMsg);
  } else if (errorMsg.indexOf("account is already registered") > -1) {
    $("input#reg_email").parent().append(theMsg);
  }
}, 100);

// testing deployment

var minLength = 8;
var maxLength = 8;

$("#password_1").on("keydown keyup change", function(){
    var value = $(this).val();
    if (value.length < minLength)
        $("span").text("Please Enter 8 Letters");
    else if (value.length > maxLength)
        $("span").text("Please Enter 8 Letters");
    else
        $("span").text("Password is valid");
});
