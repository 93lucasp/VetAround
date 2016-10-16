$(function () {
  $('input#search').quicksearch('.col');
});

// CreatePlace function called on the button click;
var createPlace = function(e) {
  e.preventDefault();
  var place = $(e.target).serialize();  //The .serialize() method creates a text string in standard URL-encoded notation from the form (example namePlace=name of the place);
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

