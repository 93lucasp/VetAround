var Place = require("../models/place");

var placesController = {
  // Find query of mongoose the find all the values of the collection;
  index: function(req, res) {
    Place.find({}, function(err, docs) {
      if(err) returnError(err);
      docs.forEach(function(place) {
        User.findOne({_id: place.postedBy[0]}, function(err, user){
          place.user = user;
        });
      });
      // console.log("currentUser is: ", req.currentUser);
      req.currentUser(function() {
        docs.forEach(function(place) {

          if (req.user) {
          // console.log("posted by111•–•", typeof place.postedBy[0].id);
          // console.log("req user •••••••••••••", req.user);
          // console.log("posted by222•-•", typeof req.user._id.id);
          // console.log("posted by333•-•", (place.postedBy[0] == req.user._id));
          var placePostedBy = JSON.stringify(place.postedBy[0]);
          var userId = JSON.stringify(req.user._id);
            if(placePostedBy == userId) {
              place.canDelete = true;
            } 
            else {
              place.canDelete = false;
            }
          }

          
            console.log("can delete?????:", place.canDelete);
        });
      });
      res.render("places/index", {veterinary: docs});
	  }).sort({createdAt: -1}); // With .sort I am going to order the result of the find for the latest creater;
  },

  // Create query of mongoose
  create: function(req, res) {
    console.log("req body 1111:", req.body);
    Place.create(req.body, function(err, place) {
      console.log("place----",place);
      console.log("session user id----", req.session.userId);
      // Pushing inside the array postedBy the user id
      place.postedBy.push(req.session.userId);
      console.log("place----after pushing",place);
      place.save(function(err) {
        if (err) console.log("errororororooror");
      });
      err ? 
      res.sendStatus(500) : res.sendStatus(200);
      
      // if there there is an error: send status 500 and going to the fail function in the client side(app.js); else: send status 200 and going to the done function in the client side(app.js);
	    console.log("req body 2222:", place);
	  });
  },
  // Checking the places created
  apiPlaces: function(req, res) {
    Place.find({}, function(err, places) {
      res.status(200).send(JSON.stringify(places));
    });
  },

  // FindByid query of mongoose that find only the one with the id that i get from params.id;
  show: function(req, res) {
  	var id = req.params.id;
  	Place.findById(id, function(err, place){
      req.currentUser(function() {
          if (req.user) {
        
          var postedBy = JSON.stringify(place.postedBy[0]);
          var userId = JSON.stringify(req.user._id);
          console.log("posted by111•–•", typeof postedBy + postedBy);
          // console.log("req user •••••••••••••", req.user);
          console.log("posted by222•-•", typeof userId + userId);
            if(postedBy == userId) {
              place.canDelete = true;
            } 
            else {
              place.canDelete = false;
            }
          }

          
            console.log("can delete?????:", place.canDelete);
        res.render("places/show", {namePlace: place.namePlace, nameDoc: place.nameDoc, city: place.city, address: place.address, id: place.id, postedBy: place.postedBy, canDelete: place.canDelete});
      });
  		
  	});
  },

  index: function(req, res) {
    Place.find({}, function(err, docs) {
      if(err) returnError(err);
      docs.forEach(function(place) {
        User.findOne({_id: place.postedBy[0]}, function(err, user){
          place.user = user;
        });
      });
      // console.log("currentUser is: ", req.currentUser);
      req.currentUser(function() {
        docs.forEach(function(place) {

          if (req.user) {
          // console.log("posted by111•–•", typeof place.postedBy[0].id);
          // console.log("req user •••••••••••••", req.user);
          // console.log("posted by222•-•", typeof req.user._id.id);
          // console.log("posted by333•-•", (place.postedBy[0] == req.user._id));
          var placePostedBy = JSON.stringify(place.postedBy[0]);
          var userId = JSON.stringify(req.user._id);
            if(placePostedBy == userId) {
              place.canDelete = true;
            } 
            else {
              place.canDelete = false;
            }
          }

          
            console.log("can delete?????:", place.canDelete);
        });
      });
      res.render("places/index", {veterinary: docs});
    }).sort({createdAt: -1}); // With .sort I am going to order the result of the find for the latest creater;
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