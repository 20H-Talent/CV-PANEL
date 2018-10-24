
/***************************************************************************************
 * I want to applied this on enterprise form.... we have to ask Borja.
 ***************************************************************************************/

/***************************************************************************************
 * Looping trought the errors of the inputs and inner them in to a list,if not valids ***
 ***************************************************************************************/
function formErrors() {
    //Cleaning the content of the div before calling the function again
    var renderize = document.getElementById("showErrors");
    //Go back to initial value/display
    document.getElementById("showErrors").style.display = "block";
    renderize.innerHTML = "";
    document.getElementById("showErrors").style.opacity = "100";
    //getting the form by id
    var form = document.getElementById("alertformenterprise");
    var input = form.querySelectorAll(
      "input[type=text],input[type=email],input[type=number],input[type=zip],input[type=address],input[type=select],input[type=telephone]"
    );
    //looping trought the elements of the form
    for (i = 0; i < input.length; i++) {
      if (input[i].checkValidity()) {
        input[i].className = "form-control custom-control";
        // input[i].className = "form-control close";
      }
    }
    for (i = 0; i < input.length; i++) {
      //if the elemnts of the form are not valids
      if (!input[i].checkValidity()) {
        //creating the div main where the errors will be printed
        var divMain = document.createElement("div");
        //giving a class to the div of boostrap
        divMain.className = "col-lg-12";
        var ul = document.createElement("ul");
        ul.className = "alert alert-danger ";
        var li = document.createElement("li");
        li.className = "font-weight-light ";
        ul.appendChild(li);
        //the li  will appear as messages of error if the input is invalid
        li.innerHTML = input[i].name + " : " + input[i].validationMessage;
        input[i].className = "form-control borderafter";
        divMain.appendChild(ul);
        //inserting the div where the errors are in to the div rederize that already exists in html
        document.getElementById("showErrors").appendChild(divMain);
      } // end if
    }
    setTimeout(function() {
      document.getElementById("showErrors").style.opacity = "0";
      document.getElementById("showErrors").style.display = "none";
    }, 5000); // end for loop
    //finish off the list and print it out
  } // end formErrors