generalConstructor.construct("users-table");

activateTooltips();

function activateTooltips(container = null) {
    const target = container || $(document);

    target.find(".app-tooltip").each((index, element) => {
        const $element = $(element);
        if (!$element.hasClass("tooltip-loaded")) {
            $element.addClass("tooltip-loaded").tooltip();
        }
    });
}
/**
 *  Function to load the content by ajax
 */
$('document').ready(function() {
    $("#list-users").on("click", function() {
        loadRightMenu();
    });
});

function loadRightMenu() {

    $.ajax({
        url: "../html/right-menu.html",
        dataType: "html",
        success: function(data) {
            $("#right-menu-ajax").empty().append(data);
            formSideBar();
            $("form#advanced-search").on("submit", function(e) {
                e.preventDefault();
                const formInputs = $(this).find("input");
                usersTable.renderDataOnResize(null, window.innerWidth, formInputs);
            });
        }
    });


}
// $("#right-menu-a<´jax").load("../html/right-menu.html", function() {
//     formSideBar();
//     //Submit event for the form that handle the advanced search
//     $("form#advanced-search").on("submit", function(e) {
//         e.preventDefault();
//         const formInputs = $(this).find("input");
//         usersTable.renderDataOnResize(null, window.innerWidth, formInputs);
//     });
// });

/**
 * Function to control the content (search form) of the right sidebar
 */

function formSideBar() {
    // -------------  LATERAL LEFT MENU ----------
    let sidebarItems = document.querySelectorAll("#left-menu li");
    for (sidebarItem of sidebarItems) {
        sidebarItem.addEventListener("click", function() {
            let current = document.getElementsByClassName("sidebar-position");
            current[0].className = current[0].className.replace(
                "sidebar-position",
                ""
            );
            this.className += " sidebar-position";
        });
    }
    //  function openNewWindow() {   // Esta función no se utiliza en ningún lado.
    //     open("form.html");
    //   }
    // --------------- LATERAL RIGHT MENU ----------
    let rangeAge = document.querySelector("#age-range");
    let age = document.querySelector("#age");
    let rangeExp = document.querySelector("#exp-years");
    let experience = document.querySelector("#range");

    // to set age of user next to input age-range
    rangeAge.addEventListener("click", function(event) {
        age.innerHTML = rangeAge.value;
    });
    // to set experience of user next to input exp-years
    rangeExp.addEventListener("click", function(event) {
        experience.innerHTML = rangeExp.value;
    });

    let sidebarItems2 = document.querySelectorAll("#right-menu li");
    for (sidebarItem of sidebarItems2) {
        sidebarItem.addEventListener("click", function() {
            let current = document.getElementsByClassName("sidebar-position");
            current[0].className = current[0].className.replace(
                "sidebar-position",
                ""
            );
            this.className += " sidebar-position";
        });
    }
}

/**************************************************************************
 *  LEFT SIDE BAR control (mobile or desktop/tablet)
 *  The width of the left sidebar is the same
 * for the tablet and for the desktop, it only changes for the mobile.
 **************************************************************************/

changeScreen();
$(window).on("resize", function() {
    // var windowSize = $(window).width();
    changeScreen();
});

function changeScreen() {
    var windowSize = $(window).width();
    if (windowSize > 425) {
        $("#open-icon-left").on("click", navLeft);
        $("#left-menu").on("touchmove", navLeft);
    } else {
        console.log("Mobile");
        $("#open-icon-left").on("click", navLeftMobile);
        $("#main-left").on("touchmove", navLeftMobile);
    }
}

/*******************************************************************
 *  LEFT SIDE DESKTOP
 *  Control size left container, (open and close states)
 *******************************************************************/

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
    }
}

/*******************************************************************
 *  LEFT SIDE BAR MOBILE
 *  Control size left container, (open and close states)
 *******************************************************************/

function navLeftMobile(event) {
    let icon = event.target;
    if (icon.classList.toggle("active")) {
        document.getElementById("mySidenavLeft").style.width = "90%";
        document.getElementById("main-left").style.marginLeft = "90%";
        document.querySelector(".container-left").style.width = "90%";
        document.querySelector(".container-left").style.marginRight = "0px";

        let spans = document.querySelectorAll("#left-menu span");

        for (span of spans) {
            span.classList.replace("close", "open");
        }
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
    }
}

/*******************************************************************
 *  RIGHT SIDE BAR
 * Control size right container, (open and close states)
 *******************************************************************/

let iconOpenRight = document.querySelector("#open-icon-right");
iconOpenRight.addEventListener("click", navRight);

function navRight(event) {
    let icon = event.target;
    if (icon.classList.toggle("active")) {
        let pSearchFor = document.querySelector("#right-menu p");
        let selectedElement = document.querySelector("#main-right .close");

        document.getElementById("mySidenavRight").style.width = "300px";
        document.getElementById("main-right").style.marginRight = "220px";
        document.querySelector(".container-right").style.width = "300px";
        document.querySelector(".container-right").style.marginLeft = "0px";

        // to hide the paragraph 'Search for:' with transition.
        pSearchFor.style.opacity = "1";
        pSearchFor.style.fontSize = "1rem";
        pSearchFor.style.transitionDuration = "0s";
        pSearchFor.style.transitionDelay = "1s";

        selectedElement.classList.replace("close", "open");
    } else {
        let pSearchFor = document.querySelector("#right-menu p");
        let selectedElement = document.querySelector("#main-right section");
        document.getElementById("mySidenavRight").style.width = "34px";
        document.getElementById("main-right").style.marginRight = "0";
        document.querySelector(".container-right").style.width = "0px";
        document.querySelector(".container-right").style.marginLeft = "30px";
        document.querySelector("#right-menu p").style.fontSize = "0.55rem";

        // to display the paragraph 'Search for:' with transition.
        pSearchFor.style.opacity = "0";
        pSearchFor.style.fontSize = "0.55rem";
        pSearchFor.style.transitionDuration = "0s";
        pSearchFor.style.transitionDelay = "0s";

        selectedElement.classList.replace("open", "close");
    }
}

/********************************************
 * FUNCTIONS TO DISPLAY LAST CHANGE ON NAV
 ********************************************/

// --- TO SEE LIST OF USERS ---
let listUsers = document.querySelector("#list-users");
let newUser = document.getElementById("new-user");
let listCompanies = document.getElementById("list-companies");
let surveyMenuItem = document.querySelector(".SurveyMenuItem");
let divNavBar = document.querySelector("#div-navbar");
let pdivNavBar = document.querySelector("#div-navbar p");
let alertClose = document.querySelector(".alert-close");

function closeNavbar() {
    divNavBar.classList.replace("open", "close");
}
listUsers.addEventListener("click", function(e) {
    generalConstructor.construct("users-table");
    divNavBar.classList.replace("close", "open");
    divNavBar.innerHTML = "";
    divNavBar.innerHTML += `<button onclick="closeNavbar()"  type="button" class="alert-close border-0 bg-transparent">
  <i class="far fa-times-circle"></i>
  </button>`;
    divNavBar.innerHTML += `Se ha listado usuarios a las: [${new Date().getHours()}:${new Date().getMinutes()} hours] .`;
});

newUser.addEventListener("click", function(e) {
    generalConstructor.construct("user-form");
});

surveyMenuItem.addEventListener("click", function(e) {
    generalConstructor.construct("survey-creator");
});

listCompanies.addEventListener("click", function(e) {
    generalConstructor.construct("companies-table");
});
// --- TO SEE CREATE USER ---
/*
let buttonCreateUser = document.querySelector("#button-create-user");
buttonCreateUser.addEventListener("click", function() {
  divNavBar.classList.replace("close", "open");
  divNavBar.innerHTML = "";
  divNavBar.innerHTML += `<button onclick="closeNavbar()"  type="button" class="alert-close border-0 bg-transparent">
  <i class="far fa-times-circle"></i>
  </button>`;
  divNavBar.innerHTML += `Se ha creado usuario a las: [${new Date().getHours()}:${new Date().getMinutes()} hours] .`;
});*/
// --- TO SEE SEARCH OF USERS ---

/*************************************************************************************
 * Load by ajax the sidebar form into the center column
 ************************************************************************************/

if ($("#submit_search").length) {
    // use this if you are using id to check  // it exists
    let submitSearch = document.querySelector("#submit_search");
    submitSearch.addEventListener("click", function() {
        divNavBar.classList.replace("close", "open");
        divNavBar.innerHTML = "";
        divNavBar.innerHTML += `<button onclick="closeNavbar()"  type="button" class="alert-close border-0 bg-transparent">
    <i class="far fa-times-circle"></i>
    </button>`;
        divNavBar.innerHTML += `Se ha buscado usuario/s a las: [${new Date().getHours()}:${new Date().getMinutes()} hours] .`;
    });
} else {
    $("#search-btn").on("click", loadMain);

    function loadMain() {
        $("#Div1").load("../html/right-menu.html", function(
            responseText,
            textStatus,
            jqXHR
        ) {
            console.log(" loadMain:  " + textStatus);
            formSideBar();
        });
    }
}

function switchVisible(visible) {
    // console.log("div1", document.getElementById("Div1").style.display);
    // console.log("div2", document.getElementById("Div2").style.display);
    switch (visible) {
        case "Div1": //== table users
            //hidding the form
            document.getElementById("Div4").style.display = "none";
            //showing the table
            break;
        case "Div2": //== form
            //hidding the table
            document.getElementById("Div1").style.display = "none";
            document.getElementById("Div4").style.display = "none";
            //showing the form
            break;
        case "companyTable": //== table users
            //hidding the form
            document.getElementById("Div1").style.display = "none";
            document.getElementById("Div4").style.display = "none";
            //showing the table
            break;

        case "Div4": //== form
            //hidding the table
            document.getElementById("Div1").style.display = "none";
            //showing the form
            document.getElementById("Div4").style.display = "block";
            break;

        default:
            break;
    }
}