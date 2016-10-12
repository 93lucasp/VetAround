var Place = require("../models/place");

var placesController = {
	    index: function(req, res) {
	    Place.find({}, function(err, docs) {
	      res.render("places/index", {places: docs});
	    });
	  },
	  create: function(req, res) {
	    // strong params
	    // var nome = req.body.nome;
	    // var cognomey = req.body.cognome;
	    Place.create({namePlace: req.body.namePlace}, function(err, doc) {
	      // if there there is an error: redirect to reminders#new; else: redirect to reminders#index
	      err ? res.redirect("/places") : res.sendStatus(200);
	    });
	  }
};

module.exports = placesController;