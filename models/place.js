var mongoose = require('mongoose');
var PlaceSchema = new mongoose.Schema({
	namePlace: {type: String},
	createdAt: { type: Date, required: false, default: Date.now },
	// postedBy: [{
	//   type: Schema.Types.ObjectId,
 //      ref: 'User'
	// }]
});
var Place = mongoose.model("Place", PlaceSchema);
module.exports = Place;