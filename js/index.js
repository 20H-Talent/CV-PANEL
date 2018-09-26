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



function openNav() {
  document.getElementById("mySidenavLeft").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenavLeft").style.width = "0";
}