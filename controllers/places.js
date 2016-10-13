var Place = require("../models/place");

var placesController = {
	    index: function(req, res) {
	    Place.find({}, function(err, docs) {
	      res.render("places/index", {veterinary: docs});
	    }).sort({createdAt: -1});
	  },
	  create: function(req, res) {
	    Place.create({namePlace: req.body.namePlace}, function(err, doc) {
	      // if there there is an error: send status 500 and going to the fail function in the client side(app.js); else: send status 200 and going to the done function in the client side(app.js).
	      err ? 
	      res.sendStatus(500) : res.sendStatus(200);
	    });
	  }
};

module.exports = placesController;