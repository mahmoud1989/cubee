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
  }
  if (errorMsg.indexOf("password") > -1 || errorMsg.indexOf("Password") > -1) {
    $("input#password").parent().append(theMsg);
  }
  if (errorMsg.indexOf("account is already registered") > -1) {
    $("input#reg_email").parent().append(theMsg);
  }

  // Password field validation
  $(".woocommerce-form-login input#password").attr("maxlength", "8");
  $(".woocommerce-form-login input#password").attr("minlength", "8");
}, 1000);
