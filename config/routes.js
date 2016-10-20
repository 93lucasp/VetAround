// Dependencies;
var express 		  = require('express'),
	app 			  = express(),
	mongoose 		  = require('mongoose'),
	bodyParser 		  = require('body-parser'),
	methodOverride 	  = require('method-override'),
	router 			  = express.Router(),
	placesController  = require('../controllers/places'); // Requiring the controlles in this page so then i can use them in the routes to say where to go in the server side;
	usersController   = require('../controllers/users'); 

// Differents routes;

router.route('/welcome').get(function(req, res){
  res.send('welcome');
});

// Routes for places page;
router.route('/places')
	.get(placesController.index) //calling the INDEX function in the server side;
	.post(placesController.create); //calling the CREATE function in the server side;

router.route('/users')
	.get(usersController.index) //calling the INDEX function in the server side;
	.post(usersController.create); //calling the CREATE function in the server side;

// Routes for places/id page;
router.route('/places/:id')
	.delete(placesController.destroy) //calling the DESTROY function in the server side;
	.get(placesController.show) //calling the SHOW function in the server side;
	.put(placesController.update); //calling the UPDATE function in the server side;

router.route('/login')
	.post(usersController.login); 
router.route('/logout')
 	.get(usersController.logoutUser);
 	
// router.route('/profile')
// 	.get(usersController.profile); 
	// .get(usersController.index) //calling the INDEX function in the server side;
router.route('/api/places')
	.get(placesController.apiPlaces);


	
module.exports = router;