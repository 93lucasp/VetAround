
var createPlace = function(e) {
  var place = $(e.target).serialize();
  $.post("/places", place)
   .done(function(res) {
     window.location.href = '/places';
    })
   .fail(function(err) {
     console.log("Error", err);
    }); 
};