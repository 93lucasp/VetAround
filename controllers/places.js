var Place = require("../models/place");

var placesController = {
  // search: function(req, res){
  //   var name = req.body.namePlace;
  //   Place.find({ namePlace: "bau" }, function(err, docs){
  //     console.log("ciao---find name...-", docs);
  //     // res.status(201).send(JSON.stringify(docs));
  //     res.render("places/index", {namePlace: docs.namePlace});
  //   });
  // },
  index: function(req, res) {
    Place.find({}, function(err, docs) {
      res.render("places/index", {veterinary: docs});
	}).sort({createdAt: -1}); // With .sort I am going to order the result of the find for the latest creater;
  },
  // Create query of mongoose
  create: function(req, res) {
    Place.create({namePlace: req.body.namePlace, nameDoc: req.body.nameDoc, city: req.body.city, address: req.body.address}, function(err, doc) {
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
  	Place.remove({_id: id}, function(err, place) {
  	  // if there there is an error: send status 500; else: send status 200 and going to the success function in the client side(app.js);
  	  err ? 
	  res.sendStatus(500) : res.sendStatus(200);
  	});
  },
  
};

module.exports = placesController;