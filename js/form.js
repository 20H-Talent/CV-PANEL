// // Example starter JavaScript for disabling form submissions if there are invalid fields
// (function() {
//   "use strict";

//   window.addEventListener(
//     "load",
//     function() {
//       // Fetch all the forms we want to apply custom Bootstrap validation styles to
//       var forms = document.getElementsByClassName("needs-validation");

//       // Loop over them and prevent submission
//       var validation = Array.prototype.filter.call(forms, function(form) {
//         form.addEventListener(
//           "submit",
//           function(event) {
//             if (form.checkValidity() === false) {
//               event.preventDefault();
//               event.stopPropagation();
//             }
//             form.classList.add("was-validated");
//           },
//           false
//         );
//       });
//     },
//     false
//   );
// })();
// function myFunction() {
//   var inpObj = document.getElementById("id1");
//   if (!inpObj.checkValidity()) {
//     document.getElementById("demo").innerHTML = inpObj.setCustomValidity();
//   } else {
//     document.getElementById("demo").innerHTML = "Input OK";
//   }
// }
// function validate() {
//   var firstname = document.getElementById("firstname");
//   var surname = document.getElementById("surname");
//   var age = document.getElementById("age");
//   var email = document.getElementById("email");
//   var telephone = document.getElementById("tel");
//   if (firstname.length === 0) {
//     return alert("invalis");
//   }
// }

// function notEmpty(elem, helperMsg) {
//   if (elem.value.length == 0) {
//     alert(helperMsg);
//     elem.focus();
//     return false;
//   }

//   return true;
// }

// function validAge(elem, helperMsg) {
//   var age = elem.value;

//   if (age <= 0 || age > 100) {
//     alert(helperMsg);
//     return false;
//   }

//   return true;
// }

// function emailValid(elem, helperMsg) {
//   var atpos = elem.value.indexOf("@");
//   var dotpos = elem.value.lastIndexOf(".");

//   if (atpos < 0 || dotpos < 0) {
//     alert(helperMsg);
//     return false;
//   }

//   return true;
// }

// function GenerateJSON(event) {
//   event.preventDefault();
//   event.stopPropagation();
//   alert("Estoy en el generate JSON");
// }
function validate() {
  var remember = document.getElementById("available");
  if (remember.checked) {
    alert("The checkbox is checked");
  } else {
    alert("The checkbox is not checked");
  }
}
