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
  	console.log("user2 is: ", user);
  	User.createSecure(user, function() {
      console.log("user2 is: ", user);
      res.status(201).send(JSON.stringify(user));
    });
  },
  login: function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	console.log("email1 is: ", email);
	console.log("password1 is: ", password);
	User.authenticate(email, password, function (err, user) {
	 console.log("user2 is: ", user);
	console.log("email2 is: ", email);
	console.log("password2 is: ", password);
	if (err) {
        console.log(err);
        res.status(500).send();
      } 
      else {
        req.login(user);
        res.status(200).send();
        console.log("login: ", req.session);
      }

	});
  }, 
  profile: function(req, res) {
  	req.currentUser(function (err, user) {
    res.send("Hello " + user.email);
  });
  }

};

module.exports = usersController;