// -------------  LATERAL LEFT MENU ----------
let sidebarItems = document.querySelectorAll("#left-menu li");
for (sidebarItem of sidebarItems) {
  sidebarItem.addEventListener("click", function() {
    let current = document.getElementsByClassName("sidebar-position");
    current[0].className = current[0].className.replace("sidebar-position", "");
    this.className += " sidebar-position";
  });
}
function openNewWindow() {
  open("form.html");
}

// --------------- LATERAL RIGHT MENU ----------
let range = document.querySelector("#age-range");
let age = document.querySelector("#age");
range.addEventListener("click", function(event) {
  age.innerHTML = range.value;
});

let sidebarItems2 = document.querySelectorAll("#right-menu li");
for (sidebarItem of sidebarItems2) {
  sidebarItem.addEventListener("click", function() {
    let current = document.getElementsByClassName("sidebar-position");
    current[0].className = current[0].className.replace("sidebar-position", "");
    this.className += " sidebar-position";
  });
}

/*******************************
 *  LEFT SIDE BAR control (mobile or desktop/tablet)
 *******************************/
// El ancho de la barra izquierda es igual para la tablet y para el escritorio, solo cambia para el móvil.

// $(window).on('resize', function(){
// 	var windowSize = $(window).width(); 
//     if (windowSize < 426){
//     	navLeftMobile();
//     } else { 
//     	navLeft();
//     } 
// });

/*******************************
 *  LEFT SIDE DESKTOP
 *******************************/

// let iconOpenLeft = document.querySelector("#open-icon-left");
// iconOpenLeft.addEventListener("click", navLeft);

// $(window).on('tounchstart', navLeft);

let iconOpenLeft = document.querySelector("#open-icon-left");
iconOpenLeft.addEventListener("touchstart", navLeft);

function navLeft(event) {
  let icon = event.target;
  if (icon.classList.toggle("active")) {
    document.getElementById("mySidenavLeft").style.width = "170px";
    document.getElementById("main-left").style.marginLeft = "170px";
    document.querySelector(".container-left").style.width = "170px";
    document.querySelector(".container-left").style.marginRight = "0px";

    let spans = document.querySelectorAll("#left-menu span");
  
    for (span of spans) {
      span.classList.replace("close", "open");
    }
     // Muestra el botón de busqueda.
    //  let searchBtn = document.getElementById("search-btn");
    //  searchBtn.classList.replace("close", "open");
   
  } else {
    document.getElementById("mySidenavLeft").style.width = "50px";
    document.getElementById("main-left").style.marginLeft = "0";
    document.querySelector(".container-left").style.width = "50px";
    document
      .querySelector("#left-menu span")
      .classList.replace("open", "close");
    document.querySelector("#left-menu a").style.marginLeft = "0px";
    let spans = document.querySelectorAll("#left-menu span");

    for (span of spans) {
      span.classList.replace("open", "close");
    }

    //oculta el botón de busqueda.
    // searchBtn = document.getElementById("search-btn");
    // searchBtn.classList.replace("open", "close");

  }
}

/*******************************
 *  LEFT SIDE BAR MOBILE
 *******************************/

// $('body').resize( navLeftMobile );

// function navLeftMobile(event) {
//   let icon = event.target;
//   if (icon.classList.toggle("active")) {

//     document.getElementById("mySidenavLeft").style.width = "75%";
//     document.getElementById("main-left").style.marginLeft = "75%";
//     document.querySelector(".container-left").style.width = "75%";
//     document.querySelector(".container-left").style.marginRight = "0px";

//     let spans = document.querySelectorAll("#left-menu span");

//     for (span of spans) {
//       span.classList.replace("close", "open");
//     }
    
//   } else {
//     document.getElementById("mySidenavLeft").style.width = "0";
//     document.getElementById("main-left").style.marginLeft = "0";
//     document.querySelector(".container-left").style.width = "0";
//     document
//       .querySelector("#left-menu span")
//       .classList.replace("open", "close");
//     document.querySelector("#left-menu a").style.marginLeft = "0px";

//     let spans = document.querySelectorAll("#left-menu span");

//     for (span of spans) {
//       span.classList.replace("open", "close");
//     }
//   }
// }



/*******************************
 *  RIGHT SIDE BAR
 *******************************/

let iconOpenRight = document.querySelector("#open-icon-right");
iconOpenRight.addEventListener("click", navRight);

function navRight(event) {
  let icon = event.target;
  if (icon.classList.toggle("active")) {
    let pSearchFor = document.querySelector('#right-menu p');
    let selectedElements = document.querySelectorAll("#right-menu .close");
    let divSelectedElements = document.querySelectorAll("#right-menu div.close");
    document.getElementById("mySidenavRight").style.width = "300px";
    document.getElementById("main-right").style.marginRight = "220px";
    document.querySelector(".container-right").style.width = "300px";
    document.querySelector(".container-right").style.marginLeft = "0px";

    // to hide the paragraph 'Search for:' with transition.
    pSearchFor.style.opacity = "1";
    pSearchFor.style.fontSize = "1rem";
    pSearchFor.style.transitionDuration = "0s";
    pSearchFor.style.transitionDelay = '1s';

    for (selectedElement of selectedElements) {
      for(divSelectedElement of divSelectedElements){
        divSelectedElement.classList.add('d-flex');
      }
      selectedElement.classList.replace("close", "open");

    }
  } else {
    let pSearchFor = document.querySelector('#right-menu p');
    let selectedElements = document.querySelectorAll("#right-menu .open");
    let divSelectedElements = document.querySelectorAll("#right-menu div.open");
    document.getElementById("mySidenavRight").style.width = "70px";
    document.getElementById("main-right").style.marginRight = "0";
    document.querySelector(".container-right").style.width = "70px";
    document.querySelector("#right-menu p").style.fontSize = "0.55rem";


    // to display the paragraph 'Search for:' with transition.
    pSearchFor.style.opacity = "0";
    pSearchFor.style.fontSize = "0.55rem";
    pSearchFor.style.transitionDuration = "0s";
    pSearchFor.style.transitionDelay = '0s';

    for (selectedElement of selectedElements) {
      for(divSelectedElement of divSelectedElements){
        divSelectedElement.classList.remove('d-flex');
      }
      selectedElement.classList.replace("open", "close");
    }
  // }
  }
}
// ------------- FUNCTIONS TO DISPLAY LAST CHANGE ON NAV --------------
// --- TO SEE LIST OF USERS ---
let listUsers = document.querySelector("#list-users");
let divNavBar = document.querySelector("#div-navbar");
let pdivNavBar = document.querySelector("#div-navbar p");
let alertClose = document.querySelector(".alert-close");
function closeNavbar() {
  divNavBar.classList.replace("open", "close");
}
listUsers.addEventListener("click", function() {
  divNavBar.classList.replace("close", "open");
  divNavBar.innerHTML = "";
  divNavBar.innerHTML += `<button onclick="closeNavbar()"  type="button" class="alert-close border-0 bg-transparent">
  <i class="far fa-times-circle"></i>
  </button>`;
  divNavBar.innerHTML += `Se ha listado usuarios a las: [${new Date().getHours()}:${new Date().getMinutes()} hours] .`;
});
// --- TO SEE CREATE USER ---
let buttonCreateUser = document.querySelector("#button-create-user");
buttonCreateUser.addEventListener("click", function() {
  divNavBar.classList.replace("close", "open");
  divNavBar.innerHTML = "";
  divNavBar.innerHTML += `<button onclick="closeNavbar()"  type="button" class="alert-close border-0 bg-transparent">
  <i class="far fa-times-circle"></i>
  </button>`;
  divNavBar.innerHTML += `Se ha creado usuario a las: [${new Date().getHours()}:${new Date().getMinutes()} hours] .`;
});
// --- TO SEE SEARCH OF USERS ---
let submitSearch = document.querySelector("#submit_search");
submitSearch.addEventListener("click", function() {
  divNavBar.classList.replace("close", "open");
  divNavBar.innerHTML = "";
  divNavBar.innerHTML += `<button onclick="closeNavbar()"  type="button" class="alert-close border-0 bg-transparent">
  <i class="far fa-times-circle"></i>
  </button>`;
  divNavBar.innerHTML += `Se ha buscado usuario/s a las: [${new Date().getHours()}:${new Date().getMinutes()} hours] .`;
});
