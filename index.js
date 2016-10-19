// Dependencies
var express 		= require('express'),
	app 			= express(),
	mongoose 		= require('mongoose'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	session 		= require('express-session');
	keygen			= require('keygenerator'),

// Configuration
mongoose.connect('mongodb://localhost/VetAround');
process.on('exit', function() { mongoose.disconnect() }); // Shutdown Mongoose correctly
app.set("view engine", "hbs"); // sets view engine to handlebars
app.use(bodyParser.json());  // allows for parameters in JSON and html
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));  // allows for put/delete request in html form
app.use(express.static(__dirname + '/public')); // looks for assets like stylesheets in a `public` folder
// create the session middleware
app.use(
  session({
    secret: keygen._({specials: true}),
    resave: false,
    saveUninitialized: true
  })
);

app.use(function(req, res, next){
  //login user
  req.login = function(user) {
    req.session.userId = user._id;
  };
  // find current user
  req.currentUser = function (cb) {
    User.findOne({ _id: req.session.userId },
    function(err, user){
      req.user = user;
      res.locals.currentUser = user;
      cb(null, user);
    });

  };

  // log out current user
  req.logout = function() {
    req.session.userId = null;
    req.user = null;
  };
  // call the next middleware in the stack
  req.currentUser(next);
});


// Getting routes 
var routes = require('./config/routes');
// Using routes 
app.use(routes);

// Start server at port: 2016
app.listen(2016, function() {
	console.log('server is running');
}); 