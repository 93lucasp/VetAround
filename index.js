/* Dependencies */
var express 		  = require('express'),           // Web Frameworks;
	app 			      = express(),
	mongoose 		    = require('mongoose'),          // Mongo ODM;
  hbs             = require('hbs'),               // View engine;
  hbsutils        = require('hbs-utils')(hbs),
	bodyParser 		  = require('body-parser'),       // Allows us to get parameter values from forms;
	methodOverride 	= require('method-override'),   // Allows us to do put/delete requests in our hbs views;
	session 		    = require('express-session'),   // Create a session middleware with the given options, Session data is stored server-side;
	keygen			    = require('keygenerator');      // Random String generator;

/* Configuration */
mongoose.connect('mongodb://localhost/VetAround');        //Connection to the db
process.on('exit', function() { mongoose.disconnect() }); // Shutdown Mongoose correctly
app.set("view engine", "hbs");                            // sets view engine to handlebars
app.use(bodyParser.json());                               // allows for parameters in JSON and html
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));                       // allows for put/delete request in html form
app.use(express.static(__dirname + '/public'));           // Looks for assets like stylesheets in a `public` folder
hbsutils.registerWatchedPartials(__dirname + '/views/partials');

// create the session middleware
app.use(
  session({
    secret: keygen._({specials: true}),
    resave: false,
    saveUninitialized: true
  })
);

app.use(function(req, res, next){
  // Login user;
  req.login = function(user) {
    req.session.userId = user._id;
  };
  // Find current user;
  req.currentUser = function (cb) {
    User.findOne({ _id: req.session.userId },
    function(err, user){
      req.user = user;
      res.locals.currentUser = user;
      cb(null, user);
    });

  };

  // Logout current user;
  req.logout = function() {
    req.session.userId = null;
    req.user = null;
  };
  // Call the next middleware in the stack
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