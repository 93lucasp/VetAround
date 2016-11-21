// Dependencies;
var express 		  = require('express'),
	app 			  = express(),
	mongoose 		  = require('mongoose'),
	bodyParser 		  = require('body-parser'),
	methodOverride 	  = require('method-override'),
	router 			  = express.Router(),
	placesController  = require('../controllers/places'); // Requiring the controlles in this page so then i can use them in the routes to say where to go in the server side;
	usersController   = require('../controllers/users');  

/* Differents routes; */

router.route('/welcome')
	.get(placesController.welcome);

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////
\\                                            ROUTES FOR PLACES                                            //
 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////////////////////////*/

router.route('/home')
	// .get(commentsController.index)
	.get(placesController.index); /* Calling the INDEX function in the server side(places/users.js); */

router.route('/place/:id')
	.get(placesController.show) /* Calling the SHOW function in the server side(places/users.js); */
	.put(placesController.update) /* Calling the UPDATE function in the server side(places/users.js); */
	.delete(placesController.destroy); /* Calling the DESTROY function in the server side(places/users.js); */

router.route('/places')
	.post(placesController.create); /* Calling the CREATE function in the server side(places/users.js); */

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////
\\                                             ROUTES FOR USERS                                            //
 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////////////////////////*/

router.route('/users')
	.get(usersController.index) /* Calling the CREATE function in the server side(controllers/users.js); */
	.post(usersController.create); /* Calling the INDEX function in the server side(controllers/users.js); */
	
	

router.route('/users/:id')
	.get(usersController.show) /* Calling the SHOW function in the server side(controllers/users.js); */
	.put(usersController.update) /* Calling the UPDATE function in the server side(controllers/users.js); */
	.delete(usersController.destroy); /* Calling the DESTROY function in the server side(controllers/users.js); */

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////
\\                                             ROUTES FOR COMMENTS                                           //
 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////////////////////////*/

// router.route('/comment/:id')
// 	.get(commentsController.show) 
// 	.put(commentsController.update) 
// 	.delete(commentsController.destroy); 

router.route('/comments')
	.post(placesController.createComment);

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////
\\                                             ROUTES FOR LOGIN AND LOGOUT                                 //
 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////////////////////////*/

router.route('/login')
	.post(usersController.login); /* Calling the LOGIN function in the server side(controllers/users.js); */

router.route('/logout')
 	.get(usersController.logoutUser); /* Calling the LOGOUT function in the server side(controllers/users.js); */
	
module.exports = router;