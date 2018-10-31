// $(function () {
//     $('[data-toggle="tooltip"]').tooltip();
// });

// $(function () {
//     $('[data-toggle="tooltip"]').tooltip({title: "Error", placement: "right"});
//     // $('[data-toggle="tooltip"]').tooltip({title: "Error", placement: "Left"});
// });

function locationTooltipsIncorrect() {
  // $(function () {
  //   $('[data-toggle="tooltip"]').tooltip("show");
  // });
  $(function() {
    $("#inputName").tooltip({
      title: "Error. Please enter a valid format name.",
      placement: "right"
    });
    $("#inputName").tooltip("show");
  });

  $(function() {
    $("#inputCif").tooltip({
      title: "Error. Please enter a valid format CIF.",
      placement: "left"
    });
    $("#inputCif").tooltip("show");
  });

  $(function() {
    $("#inputAddress").tooltip({
      title: "Error. Please enter a valid format address.",
      placement: "right"
    });
    $("#inputAddress").tooltip("show");
  });

  $(function() {
    $("#inputCity").tooltip({
      title: "Error. Please enter a valid format city name.",
      placement: "left"
    });
    $("#inputCity").tooltip("show");
  });
}

function locationTooltipsCorrect() {
  $(function() {
    $("#inputName").tooltip({
      title: "Correct!!",
      placement: "right"
    });
    $("#inputName").tooltip("show");
  });

  $(function() {
    $("#inputCif").tooltip({
      title: "Correct!!",
      placement: "left"
    });
    $("#inputCif").tooltip("show");
  });

  $(function() {
    $("#inputAddress").tooltip({
      title: "Correct!!",
      placement: "right"
    });
    $("#inputAddress").tooltip("show");
  });

  $(function() {
    $("#inputCity").tooltip({
      title: "Correct!!",
      placement: "left"
    });
    $("#inputCity").tooltip("show");
  });
}
