var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/VetAround');
var Place = require("../models/place");
Place.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

var places = [
  {
    namePlace: "Cat"
  },
  {
    namePlace: "Laundry"
  },
  {
    namePlace: "Spanish"
  }
];

Place.create(places, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs);
    mongoose.connection.close();
  }
});