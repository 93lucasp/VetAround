
var createPlace = function(e) {
  var place = $(e.target).serialize();
  $.post("/places", place)
    // If received status 200 will work function done else if received status 500 working fail function
   .done(function(res) {
     window.location.href = '/places';
    })
   .fail(function(err) {
    window.location.href = '/places';
    console.log("Error", err);
    }); 
};