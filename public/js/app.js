// Calling the quicksearch function from jquery.quicksearch.js file
$(function () {
  $('input#search').quicksearch('.col');
});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                             USER
///////////////////////////////////////////////////////////////////////////////////////////////////////////*/

// Function called from the signup form;
var createUser = function(e) {
  e.preventDefault(); // The preventDefault() method will prevent the to go too fast to the URL;
  var newUser = $(e.target).serialize(); // The .serialize() method creates a text string in standard URL-encoded notation from the form (example nome=luca of the user);
  console.log("New user:",newUser);
  // Going to this route passing the data of the user got from the form;
  $.post("/users", newUser)
   // If user has been created go in the .done function if not go to the .fail function;
   .done(function(res) {
      // var id = JSON.parse(res)._id; 
      console.log('create user was successful:', res);
       window.location.href = '/places';
       // When user created calling the login function;
      $.post("/login", newUser)
       .done(function(req, res) {
          window.location.href = '/places';
        });
    })
   .fail(function(err) {
      console.log("Error", err);
    });  
};

// Function called from the login form;
var loginUser = function(e) {
  e.preventDefault();
  var user = $(e.target).serialize(); // The .serialize() method creates a text string in standard URL-encoded notation from the form (example nome=luca of the user);
  console.log("user login is:", user);
  $.post("/login", user)
  .done(function(req, res) {
    window.location.href = '/places';
    console.log("logged");
  })
  .fail(function(err) {
    console.log("Error", err);
  });  
};

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                             PLACE
///////////////////////////////////////////////////////////////////////////////////////////////////////////*/

// Function called from the create form;
var createPlace = function(e) {
  e.preventDefault();
  var place = $(e.target).serialize();  // The .serialize() method creates a text string in standard URL-encoded notation from the form (example namePlace=name of the place);
  $.post("/places", place)
    // If received status 200 will work the function done;
   .done(function(res) {
     window.location.href = '/places';
    })
   // else if received status 500 working the fail function;
   .fail(function(err) {
    window.location.href = '/places';
    console.log("Error", err);
    }); 
};

// DeletePlace function called on the button click;
var deletePlace = function(place){
  var id = $(place).data().id; // Getting the id from data-id in the button tag;
  $.ajax({
    url: '/places/' + id,
    type: 'DELETE',
    // If receving status 200 run the succes function;
    success: function(res) {
      window.location.href = '/places';
    }
  });
};

// Function called from the edit form;
var editPlace = function(place) {
  var id = $("#savePlace").data("id");
  // Getting the value that the user write in the input;
  var updateData = {
    namePlace: $('#namePlace').val(),
    nameDoc: $('#nameDoc').val(),
    address: $('#address').val(),
    city: $('#city').val(),
  };
  // Sending the values got from the input (updateData) to the update function (server side);
  $.ajax({
    url: '/places/' + id,
    type: "PUT",
    dataType: 'json',
    data: updateData,
    success: function(res) {
      // Refresching so params not still in url;
      window.location.href = '/places/' + id;
      // Writing new values received from server side with .html
      $('#namePlace').html(updateData.namePlace);
      $('#nameDoc').html(updateData.nameDoc);
      $('#address').html(updateData.address);
      $('#city').html(updateData.city);
      // id = "";
    }
  });

};

