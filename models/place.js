var mongoose 	= require('mongoose'),
	textSearch  = require('mongoose-text-search');
// defining schema for places
var PlaceSchema = new mongoose.Schema({
	namePlace: String,
	address: String,
	city: String,
	nameDoc: String,
	createdAt: { type: Date, required: false, default: Date.now }
	// postedBy: [{
	//   type: Schema.Types.ObjectId,
 //      ref: 'User'
	// }]
});

// define the model
var Place = mongoose.model("Place", PlaceSchema);



// export the model to any files that `require` this one
module.exports = Place;