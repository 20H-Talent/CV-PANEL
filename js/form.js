function myFunction() {
  var form = document.getElementById("teamo");
  for (i = 0; i < form.elements.length; i++) {
    if (!form.elements[i].checkValidity()) {
      var divMain = document.createElement("div");
      divMain.className = "col-lg-2";
      var ul = document.createElement("ul");
      ul.className = " btn-group";
      var li = document.createElement("li");
      li.className = "btn-secondary";
      ul.appendChild(li);

      li.innerHTML =
        form.elements[i].name + ":" + form.elements[i].validationMessage;
      divMain.appendChild(ul);
      document.getElementById("alerts").appendChild(divMain);
      console.log(myFunction);
    }
  }
}
