$(document).ready(function() {
  const usersDataURL = `${window.location.origin}/data/users.json`;

  $("#users-table").DataTable({
    responsive: true,
    stateSave: true,
    paging: false,
    searching: false,
    deferRender: true,
    scrollY: 1000,
    scroller: {
      loadingIndicator: true
    },
    scrollCollapse: true,
    ajax: {
      url: usersDataURL,
      type: "GET",
      dataType: "json",
      dataSrc: ""
    },
    columns: [
      {
        data: "thumbnail",
        render: function(data, type, row, meta) {
          return `<img src="${data}" alt="${data}" />`;
        }
      },
      { data: "name" },
      { data: "username" },
      { data: "email" },
      { data: "phone" }
    ]
  });
});


/*******************************
 *  LEFT SIDE BAR 
 *******************************/

function openNavLeft() {
  document.getElementById("mySidenavLeft").style.width = "250px";
  document.getElementById("main-left").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 40px and the left margin of the page content to 40px */
function closeNavLeft() {
  document.getElementById("mySidenavLeft").style.width = "40px";
  document.getElementById("main-left").style.marginLeft = "0";
}

/*******************************
 *  RIGHT SIDE BAR 
 *******************************/

function openNavRight() {
  document.getElementById("mySidenavRight").style.width = "250px";
  document.getElementById("main-right").style.marginRight = "250px";
}

/* Set the width of the side navigation to 40px and the right margin of the page content to 40px */
function closeNavRight() {
  document.getElementById("mySidenavRight").style.width = "40px";
  document.getElementById("main-right").style.marginRight = "0";
}


