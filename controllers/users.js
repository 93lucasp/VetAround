var User = require("../models/user");

var usersController = {
  /* Index function called in the routes; */
  index: function(req, res) {
    /* Find query of mongoose the find all the values of the collection; */
  	User.find({}, function(err, users) {
  		res.send(JSON.stringify(users));
  	});
  },
  /* create function called in the routes; */
  create: function(req, res) {
  	var user = req.body;
  	console.log("user - create is: ", user);
    /* Create secure query to hash the password; */
  	User.createSecure(user, function() {
      // console.log("user - create is: ", user);
      res.status(201).send(JSON.stringify(user));
      
    });
  },
  /* Show function called in the routes; */
  show: function(req, res) {
    var id = req.params.id;
    /* FindById query of mongoose the find the value I need; */
    User.findById(id, function(err, user){
      /* Sending data to the frontend with the names I want; */
      res.render("profile", {nome: user.nome, cognome: user.cognome, email: user.email, id: user.id});
    });
  },
  /* Update function called in the routes; */
  update: function(req, res) {
    var id = req.params.id;
    /* FindById query of mongoose the find the value I need; */
    User.findById(id, function(err, user){
      
      /* Checking for errors or if i have values; */
      if (err) returnError(err);
      if (req.body.nome) user.nome = req.body.nome;
      if (req.body.cognome) user.cognome = req.body.cognome;
      if (req.body.email) user.email = req.body.email;
      /* Promise mongoose (need to study promises); */
      user.save(function(err, updatedUser) {
        err ? 
        res.sendStatus(500) : res.json(updatedUser);
        
      });
    });
  }, 
  /* Destroy function called in the routes; */
  destroy: function(req, res){
    var id = req.params.id;
    /* Remove query of mongoose to remove the user with the id that i pass; */
    User.remove({_id: id}, function(err, user) {
      /* if there there is an error: send status 500; else: send status 200 and going to the success function in the client side(app.js); */
      err ? 
      res.sendStatus(500) : res.sendStatus(200);
    });
  },

  /* The login function(called in routes.js) will run the authenticate function written in the user model, it will check if the user exist; */
  login: function(req, res) {
    console.log("req body: ", req.body);
	  var email = req.body.email;
	  var password = req.body.password;
	  // console.log("email-1 is: ", email);
	  // console.log("password-1 is: ", password);
    /* Authenticate function to check if the user exist and check the password; */
	  User.authenticate(email, password, function (err, user) {
	    // console.log("user-2 is: ", user);
	    // console.log("email-2 is: ", email);
	    // console.log("password-2 is: ", password);
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
  /* the logoutUser function(called in the routes.js) will go out from the session putting the userId to null it is in the index.js file; */
  logoutUser: function(req, res) {
    req.logout();
    // console.log("logout: ", req.session);
    res.redirect("/home");
  }, 

};

module.exports = usersController;