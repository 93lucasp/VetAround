var express 		= require('express'),
	app 			= express(),
	mongoose 		= require('mongoose'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	router 			= express.Router(),
	placesController= require('../controllers/places');

router.route('/').get(function(req, res){
  res.send('welcome');
});

router.route('/places')
	.get(placesController.index)
	.post(placesController.create);

router.route('/places/:id')
	.delete(placesController.destroy)
	.get(placesController.show);

module.exports = router;