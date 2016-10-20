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
  	console.log("user - create is: ", user);
  	User.createSecure(user, function() {
      console.log("user - create is: ", user);
      res.status(201).send(JSON.stringify(user));
    });
  },
  // The login function will run the authenticate function written in the user model, it will check if the user exist;
  login: function(req, res) {
    console.log("req body: ", req.body);
	  var email = req.body.email;
	  var password = req.body.password;
	  console.log("email-1 is: ", email);
	  console.log("password-1 is: ", password);
	  User.authenticate(email, password, function (err, user) {
	    console.log("user-2 is: ", user);
	    console.log("email-2 is: ", email);
	    console.log("password-2 is: ", password);
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
  // the logoutUser function will go out from the session putting the userId to null it is in the index.js file;
  logoutUser: function(req, res) {
    req.logout();
    console.log("logout: ", req.session);
    res.redirect("/places");
  }, 

};

module.exports = usersController;