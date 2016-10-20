var Place = require("../models/place");

var placesController = {
  // Find query of mongoose the find all the values of the collection;
  index: function(req, res) {
    Place.find({}, function(err, docs) {
      res.render("places/index", {veterinary: docs});
	  }).sort({createdAt: -1}); // With .sort I am going to order the result of the find for the latest creater;
  },

  // Create query of mongoose
  create: function(req, res) {
    Place.create({namePlace: req.body.namePlace, nameDoc: req.body.nameDoc, city: req.body.city, address: req.body.address}, function(err, doc) {
      console.log(req.body);
      // if there there is an error: send status 500 and going to the fail function in the client side(app.js); else: send status 200 and going to the done function in the client side(app.js);
	    err ? 
	    res.sendStatus(500) : res.sendStatus(200);
	  });
  },

  // FindByid query of mongoose that find only the one with the id that i get from params.id;
  show: function(req, res) {
  	var id = req.params.id;
  	Place.findById(id, function(err, place){
  		res.render("places/show", {namePlace: place.namePlace, nameDoc: place.nameDoc, city: place.city, address: place.address, id: place.id});
  	});
  },

  // Remove query of mongoose that remove only the one with the correct id;
  destroy: function(req, res){
  	var id = req.params.id;
    // Mongoose query for remove
  	Place.remove({_id: id}, function(err, place) {
  	  // if there there is an error: send status 500; else: send status 200 and going to the success function in the client side(app.js);
  	  err ? 
	    res.sendStatus(500) : res.sendStatus(200);
  	});
  },
   // Update query of mongoose that update only the one with the correct id that i get from params.id;
  update: function(req, res) {
    var id = req.params.id;
    Place.findById(id, function(err, place){
      // Checking for errors or if i have values;
      if (err) returnError(err);
      if (req.body.namePlace) place.namePlace = req.body.namePlace;
      if (req.body.nameDoc) place.nameDoc = req.body.nameDoc;
      if (req.body.address) place.address = req.body.address;
      if (req.body.city) place.city = req.body.city;
      // Promise mongoose (need to study promises);
      place.save(function(err, updatedPlace) {
        err ? 
        res.sendStatus(500) : res.json(updatedPlace);
        
      });
    });
  } 
};

module.exports = placesController;