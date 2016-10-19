var User = require("../models/user");

var usersController = {
  // Find query of mongoose the find all the values of the collection;
  index: function(req, res) {
  	User.find({}, function(err, users) {
  		res.send(JSON.stringify(users));
  	});
  },

  // Create query of mongoose
  create: function(req, res) {
  	var user = req.body;
  	console.log("user1 is: ", user);
  	User.createSecure(user, function() {
      console.log("user2 is: ", user);
      res.status(201).send(JSON.stringify(user));
    });
  }

};

module.exports = usersController;