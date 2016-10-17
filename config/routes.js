// Dependencies;
var express 		  = require('express'),
	app 			  = express(),
	mongoose 		  = require('mongoose'),
	bodyParser 		  = require('body-parser'),
	methodOverride 	  = require('method-override'),
	router 			  = express.Router(),
	placesController  = require('../controllers/places'); // Requiring the controlles in this page so then i can use them in the routes to say where to go in the server side;

// Differents routes;

router.route('/').get(function(req, res){
  res.send('welcome');
});

// Routes for places page;
router.route('/places')
	.get(placesController.index)
	.post(placesController.create);
	// .post(placesController.search);
	 //calling the create function in the server side;
	 //calling the index function in the server side;
	 //calling the index function in the server side;
	

// Routes for places/id page;
router.route('/places/:id')
	.delete(placesController.destroy) //calling the destroy function in the server side;
	.get(placesController.show) //calling the show function in the server side;
	.put(placesController.update);
module.exports = router;