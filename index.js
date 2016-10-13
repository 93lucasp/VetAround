// Dependencies
var express 		= require('express'),
	app 			= express(),
	mongoose 		= require('mongoose'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override');

// Configuration
mongoose.connect('mongodb://localhost/VetAround');
process.on('exit', function() { mongoose.disconnect() }); // Shutdown Mongoose correctly
app.set("view engine", "hbs"); // sets view engine to handlebars
app.use(bodyParser.json());  // allows for parameters in JSON and html
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));  // allows for put/delete request in html form
app.use(express.static(__dirname + '/public')); // looks for assets like stylesheets in a `public` folder

// Getting routes 
var routes = require('./config/routes');
// Using routes 
app.use(routes);

// Start server at port: 2016
app.listen(2016, function() {
	console.log('server is running');
}); 