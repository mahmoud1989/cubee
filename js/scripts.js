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
  if (errorMsg.indexOf("Coupon") > -1) {
    $("input#coupon_code").after(theMsg);
  }

  // Password field validation
  $(".woocommerce-form-login input#password").attr("maxlength", "8");
  $(".woocommerce-form-login input#password").attr("minlength", "8");
}, 1000);

// Edit Account Page
let currentUrl = window.location.href;
if (currentUrl.indexOf("edit-account") > -1) {
  $('label[for="password_current"]').text("Current password");
  $('label[for="password_1"]').text("New password");
} else if (currentUrl.indexOf("customer-logout") > -1) {
  $(".woocommerce-message a").css("color", "red");
} else if (currentUrl.indexOf("edit-address/billing")) {
  $("input#billing_phone").attr("onkeypress", "validate(event)");
  function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === "paste") {
      key = event.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
}
