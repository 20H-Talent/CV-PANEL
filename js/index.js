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
let range = document.querySelector('#age-range');
let age = document.querySelector('#age');
range.addEventListener('click', function(event){
    age.innerHTML = range.value;
});

let sidebarItems2 = document.querySelectorAll('#right-menu li');
for(sidebarItem of sidebarItems2){
    sidebarItem.addEventListener("click", function(){
        // console.log(event.target);
        let current = document.getElementsByClassName("sidebar-position");
        // event.target.classList.remove('active');
        // event.target.classList.add('sidebar-onclick');
        current[0].className = current[0].className.replace("sidebar-position", "");
        this.className += " sidebar-position";        
    });
};
/*******************************
 *  LEFT SIDE BAR 
 *******************************/

let iconOpenLeft = document.querySelector('#open-icon-left');
iconOpenLeft.addEventListener('click', navLeft);

function navLeft(event){
    let icon = event.target;
    if(icon.classList.toggle('active')){
        document.getElementById("mySidenavLeft").style.width = "250px";
        document.getElementById("main-left").style.marginLeft = "220px";
        document.querySelector(".container-left").style.width = "250px";
        document.querySelector(".container-left").style.marginRight = "0px";

        // document.querySelector(".col").style.paddingLeft = "500px";
    }else{
        document.getElementById("mySidenavLeft").style.width = "45px";
        document.getElementById("main-left").style.marginLeft = "0";
        document.querySelector(".container-left").style.width = "45px";
        document.querySelector(".container-left").style.marginRight = "0px";
        
        // document.querySelector(".col").style.paddingLeft = "500px";
    }
}

/*******************************
 *  RIGHT SIDE BAR 
 *******************************/

let iconOpenRight = document.querySelector('#open-icon-right');
iconOpenRight.addEventListener('click', navRight);

function navRight(event){
    let icon = event.target;
    if(icon.classList.toggle('active')){
        // document.getElementById("mySidenavRight").style.width = "250px";
        // document.getElementById("main-right").style.marginRight = "220px";
        document.getElementById("mySidenavRight").style.width = "250px";
        document.getElementById("main-right").style.marginRight = "220px";
        document.querySelector(".container-right").style.width = "250px";
    }else{
        document.getElementById("mySidenavRight").style.width = "40px";
        document.getElementById("main-right").style.marginRight= "0";

        document.querySelector(".container-right").style.width = "40px";

    }
}



