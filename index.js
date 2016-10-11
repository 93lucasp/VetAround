var express 		= require('express'),
	app 			= express(),
	mongoose 		= require('mongoose'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override');
	

app.set("view engine", "hbs");
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method')); 
app.use(express.static(__dirname + '/public')); 

var routes = require('./config/routes');
app.use(routes);

app.listen(2016, function() {
	console.log('server is running');
}); 