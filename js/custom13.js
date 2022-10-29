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

// Phone Number Field Validation
function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && ASCIICode > 57) return false;
  return true;
}

// Generate Script and Styles
var theSrc = [
  "/wp-content/themes/flatsome-child/vendors/js/intlTelInput.js",
  "/wp-content/themes/flatsome-child/vendors/css/intlTelInput.css",
];

// Store Script
let countryCodeScript = document.createElement("script");
countryCodeScript.setAttribute("src", theSrc[0]);

// Store Stylesheet
let countryCodeStyle = document.createElement("link");
countryCodeStyle.setAttribute("rel", "stylesheet");
countryCodeStyle.setAttribute("href", theSrc[1]);

// Edit Account Page
let currentUrl = window.location.href;
setTimeout(() => {
  if (currentUrl.indexOf("edit-account") > -1) {
    // Edit Account Page
    $('label[for="password_current"]').text("Current password");
    $('label[for="password_1"]').text("New password");
  } else if (currentUrl.indexOf("customer-logout") > -1) {
    // Logout Page
    $(".woocommerce-message a").css("color", "red");
  } else if (currentUrl.indexOf("edit-address/billing") > -1) {
    document.head.appendChild(countryCodeStyle);
    document.head.appendChild(countryCodeScript);
    // Edit Address/Billing
    $("input#billing_phone").attr("onkeypress", "return onlyNumberKey(event)");
    $("input#billing_phone").attr("value", "");
    $("input#billing_phone").attr("maxlength", "12");
    $("head").append('<script src""></script>');

    // Country Code Selector
    var input = document.querySelector("#billing_phone");
    window.intlTelInput(input, {
      // options here
    });
    $(".flag-container").click(function () {
      var countryCode = $(".selected-flag").attr("title");
      var countryCode = countryCode.replace(/[^0-9]/g, "");
      $("#billing_phone").val("");
      $("#billing_phone").val(
        "+" + countryCode + " " + $("#billing_phone").val()
      );
    });

    var errorField = $(".woocommerce-error");
    var firstName = errorField.find('li[data-id="billing_first_name"]');
    var lastName = errorField.find('li[data-id="billing_last_name"]');
    var address1 = errorField.find('li[data-id="billing_address_1"]');
    var city = errorField.find('li[data-id="billing_city"]');
    var phone = errorField.find('li[data-id="billing_phone"]');
    var email = errorField.find('li[data-id="billing_email"]');

    $("#billing_first_name").after(firstName);
    $("#billing_last_name").after(lastName);
    $("#billing_address_1").after(address1);
    $("#billing_city").after(city);
    $("#billing_phone_field").after(phone);
    $("#billing_email").after(email);
  }
}, 200);
