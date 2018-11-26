/**
 *  Function to load the content by ajax
 */
const ApiMachine = ApiFactory("https://cv-mobile-api.herokuapp.com/api");

$("document").ready(function() {
  $("#list-users").on("click", function() {
    loadRightMenu();
  });

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

  $("body").on("load", loadRightMenu());

  function loadRightMenu() {
    $.get("../html/right-menu.html").done(function(data) {
      $("#right-menu-ajax")
        .empty()
        .append(data);
      formSideBar();
      $("form#advanced-search").on("submit", function(e) {
        e.preventDefault();
        const formInputs = $(this).find("input");
        usersTable.renderDataOnResize(null, window.innerWidth, formInputs);
      });
    });
  }
  /**
   * Function to control the content (search form) of the right sidebar
   */

  function formSideBar() {
    //BOTH LATERAL MENUS (RIGHT & LEFT) EVENT LISTENERS
    ["left-menu", "right-menu"].forEach(function(menu) {
      const sidebarItems = document.querySelectorAll(`#${menu} li`);
      for (sidebarItem of sidebarItems) {
        sidebarItem.addEventListener("click", function() {
          let current = document.querySelector(".sidebar-position");
          current.className = current.className.replace("sidebar-position", "");
          this.className += " sidebar-position";
        });
      }
    });
  }

  /**************************************************************************
   *  LEFT SIDE BAR control (mobile or desktop/tablet)
   *  The width of the left sidebar is the same
   * for the tablet and for the desktop, it only changes for the mobile.
   **************************************************************************/

  changeScreen();
  $(window).on("resize", function() {
    changeScreen();
  });

  function changeScreen() {
    var windowSize = $(window).width();
    if (windowSize > 425) {
      $("#open-icon-left").on("click", navLeft);
      $("#left-menu").on("touchmove", navLeft);
    } else {
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
  //Menu items data for the left menu
  const menuItems = [
    {
      selector: "#list-users",
      constructor: "users-table"
    },
    {
      selector: "#new-user",
      constructor: "user-form"
    },
    {
      selector: "#list-companies",
      constructor: "companies-table"
    },
    {
      selector: ".SurveyMenuItem",
      constructor: "survey-creator"
    },
    {
      selector: "#btn-enterpriseAdd",
      constructor: "enterprises-form"
    },
    {
      selector: "#btn-calendar",
      constructor: "calendar"
    }
  ];

  for (menuData of menuItems) {
    const { selector, constructor } = menuData;
    document.querySelector(selector).addEventListener("click", function(event) {
      generalConstructor.construct(constructor);
    });
  }

  let alertClose = document.querySelector(".alert-close");

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
    submitSearch.addEventListener("click", function() {});
  } else {
    $("#search-btn").on("click", loadMain);

    function loadMain() {
      $("#Div1").load("../html/right-menu.html", function(
        responseText,
        textStatus,
        jqXHR
      ) {
        formSideBar();
      });
    }
  }
});
