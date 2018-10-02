// -------------  LATERAL LEFT MENU ----------
let sidebarItems = document.querySelectorAll("#left-menu li");
for (sidebarItem of sidebarItems) {
  sidebarItem.addEventListener("click", function() {
    // console.log(event.target);
    let current = document.getElementsByClassName("sidebar-position");
    // event.target.classList.remove('active');
    // event.target.classList.add('sidebar-onclick');
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
    // console.log(event.target);
    let current = document.getElementsByClassName("sidebar-position");
    // event.target.classList.remove('active');
    // event.target.classList.add('sidebar-onclick');
    current[0].className = current[0].className.replace("sidebar-position", "");
    this.className += " sidebar-position";
  });
}
/*******************************
 *  LEFT SIDE BAR
 *******************************/

let iconOpenLeft = document.querySelector("#open-icon-left");
iconOpenLeft.addEventListener("click", navLeft);

function navLeft(event) {
  let icon = event.target;
  if (icon.classList.toggle("active")) {
    // document.getElementById("mySidenavLeft").style.width = "250px";
    // document.getElementById("main-left").style.marginLeft = "220px";
    // document.querySelector(".container-left").style.width = "250px";
    document.getElementById("mySidenavLeft").style.width = "270px";
    document.getElementById("main-left").style.marginLeft = "270px";
    document.querySelector(".container-left").style.width = "270px";
    document.querySelector(".container-left").style.marginRight = "0px";

    // document.querySelector(".container-right").style.marginLeft = "0px";

    let spans = document.querySelectorAll("#left-menu span");
    // let leftAnchors = document.querySelectorAll('#left-menu a');
    // document.querySelector(".container-left").style.marginRight = "5px";

    for (span of spans) {
      // console.log(span);
      span.classList.replace("close", "open");
    }
    // for(leftAnchor of leftAnchors){
    //         span.style.marginLeft= '50px';
    // };
  } else {
    document.getElementById("mySidenavLeft").style.width = "50px";
    document.getElementById("main-left").style.marginLeft = "0";
    document.querySelector(".container-left").style.width = "50px";
    document
      .querySelector("#left-menu span")
      .classList.replace("open", "close");
    document.querySelector("#left-menu a").style.marginLeft = "0px";
    let spans = document.querySelectorAll("#left-menu span");
    // let leftAnchors = document.querySelectorAll("#left-menu a");

    for (span of spans) {
      // console.log(span);
      span.classList.replace("open", "close");
    }
    // for(leftAnchor of leftAnchors){
    //         span.style.marginLeft= '0px';
    // };

    // document.querySelector(".container-left").style.marginRight = "5px";
  }
}

/*******************************
 *  RIGHT SIDE BAR
 *******************************/

let iconOpenRight = document.querySelector("#open-icon-right");
iconOpenRight.addEventListener("click", navRight);

function navRight(event) {
  let icon = event.target;
  if (icon.classList.toggle("active")) {
    // document.getElementById("mySidenavRight").style.width = "250px";
    // document.getElementById("main-right").style.marginRight = "220px";
    document.getElementById("mySidenavRight").style.width = "400px";
    document.getElementById("main-right").style.marginRight = "220px";
    document.querySelector(".container-right").style.width = "400px";
    document.querySelector(".container-right").style.marginLeft = "0px";
    document.querySelector("#right-menu p").style.fontSize = "1rem";

    let spans = document.querySelectorAll("#right-menu span");
    // let leftAnchors = document.querySelectorAll('#left-menu a');
    // document.querySelector(".container-left").style.marginRight = "5px";

    for (span of spans) {
      // console.log(span);
      span.classList.replace("close", "open");
    }

    // document.querySelector(".container-left").style.marginRight = "0px";
  } else {
    document.getElementById("mySidenavRight").style.width = "70px";
    document.getElementById("main-right").style.marginRight = "0";

    document.querySelector(".container-right").style.width = "70px";
    document.querySelector("#right-menu p").style.fontSize = "0.55rem";

    // document.querySelector(".container-left").style.marginRight = "0px";
    let spans = document.querySelectorAll("#right-menu span");
    // let leftAnchors = document.querySelectorAll("#left-menu a");

    for (span of spans) {
      // console.log(span);
      span.classList.replace("open", "close");
    }
  }
}
// ------------- FUNCTIONS TO DISPLAY LAST CHANGE ON NAV --------------
// --- TO SEE LIST OF USERS ---
let listUsers = document.querySelector("#list-users");
let divNavBar = document.querySelector("#div-navbar");
let pdivNavBar = document.querySelector("#div-navbar p");
let alertClose = document.querySelector('.alert-close');
function closeNavbar(){
  divNavBar.classList.replace('open', 'close');
}
listUsers.addEventListener("click", function() {
  divNavBar.classList.replace('close', 'open'); 
  divNavBar.innerHTML = '';
  divNavBar.innerHTML += `<button onclick="closeNavbar()"  type="button" class="alert-close border-0 bg-transparent">
  <i class="far fa-times-circle"></i>
  </button>`;
  divNavBar.innerHTML += `Se ha listado usuarios a las: [${new Date().getHours()}:${new Date().getMinutes()} hours] .`;    
});
// --- TO SEE CREATE USER ---
let buttonCreateUser = document.querySelector("#button-create-user");
buttonCreateUser.addEventListener("click", function() {
  divNavBar.classList.replace('close', 'open'); 
  divNavBar.innerHTML = '';
  divNavBar.innerHTML += `<button onclick="closeNavbar()"  type="button" class="alert-close border-0 bg-transparent">
  <i class="far fa-times-circle"></i>
  </button>`;
  divNavBar.innerHTML += `Se ha creado usuario a las: [${new Date().getHours()}:${new Date().getMinutes()} hours] .`;
});
// --- TO SEE SEARCH OF USERS ---
let submitSearch = document.querySelector("#submit_search");
submitSearch.addEventListener("click", function() {
  divNavBar.classList.replace('close', 'open'); 
  divNavBar.innerHTML = '';
  divNavBar.innerHTML += `<button onclick="closeNavbar()"  type="button" class="alert-close border-0 bg-transparent">
  <i class="far fa-times-circle"></i>
  </button>`;
  divNavBar.innerHTML += `Se ha buscado usuario/s a las: [${new Date().getHours()}:${new Date().getMinutes()} hours] .`
});
