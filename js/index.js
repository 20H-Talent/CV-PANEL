/*******************************
 *  LEFT SIDE BAR 
 *******************************/

let iconOpenLeft = document.querySelector('#open-icon-left');
iconOpenLeft.addEventListener('click', navLeft);

function navLeft(event){
    let icon = event.target;
    if(icon.classList.toggle('active')){
        document.getElementById("mySidenavLeft").style.width = "250px";
        document.getElementById("main-left").style.marginLeft = "250px";
    }else{
        document.getElementById("mySidenavLeft").style.width = "40px";
        document.getElementById("main-left").style.marginLeft = "0";
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
        document.getElementById("mySidenavRight").style.width = "250px";
        document.getElementById("main-right").style.marginRight = "250px";
    }else{
        document.getElementById("mySidenavRight").style.width = "40px";
        document.getElementById("main-right").style.marginRight= "0";
    }
}



