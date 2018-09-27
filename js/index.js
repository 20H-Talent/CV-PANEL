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

// --------------- LATERAL RIGHT MENU ----------
let range = document.querySelector('#age-range');
let age = document.querySelector('#age');
range.addEventListener('click', function(event){
    age.innerHTML = range.value;
});
