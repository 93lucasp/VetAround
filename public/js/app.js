var createPlace = function(e) {
  var place = $(e.target).serialize();
  $.post("/places", place)
    // If received status 200 will work the function done 
   .done(function(res) {
     window.location.href = '/places';
    })
   // else if received status 500 working the fail function
   .fail(function(err) {
    window.location.href = '/places';
    console.log("Error", err);
    }); 
};

var deletePlace = function(place){
  var id = $(place).data().id;
  $.ajax({
    url: '/places/' + id,
    type: 'DELETE',
    success: function(res) {
      window.location.href = '/places';
    }
  });
};