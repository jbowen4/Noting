document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');
  var form = document.querySelector('.form');
  var inputs = document.querySelectorAll('.input-box');
  var submitBtn = document.querySelector('.submit');
  var h = document.querySelector('#h');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      form.style.borderColor = "white";
      for (i = 0; i < inputs.length; i++) {
        inputs[i].style.borderBottomColor = "white";
        inputs[i].style.color = "white";
      }
      submitBtn.style.backgroundColor = "black";
      h.style.color = "white";
      h.style.opacity = 0.25;

    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      form.style.borderColor = "#707070";
      for (i = 0; i < inputs.length; i++) {
        inputs[i].style.borderBottomColor = "#707070";
        inputs[i].style.color = "#707070";
      }
      submitBtn.style.backgroundColor = "white";
      h.style.color = "black";
      h.style.opacity = 0.1;
      console.log('Not checked');
    }
  });
});

document.getElementById("login").addEventListener("click", setActionLogin);
function setActionLogin() {
  document.getElementById("auth-form").action = "/login";
  console.log("login");
}

document.getElementById("signup").addEventListener("click", setActionSignup);
function setActionSignup() {
  document.getElementById("auth-form").action = "/register";
  console.log("signup");
}
