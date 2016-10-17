// Calling the quicksearch function from jquery.quicksearch.js file
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

var editPlace = function(place) {
  var id = $("#savePlace").data("id");
  var updateData = {
    namePlace: $('#namePlace').val(),
    nameDoc: $('#nameDoc').val(),
    address: $('#address').val(),
    city: $('#city').val(),
  };
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

