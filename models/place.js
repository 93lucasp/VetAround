var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
	User 		= require("./user");

var Comments = new Schema({
    comment: String,
    rate: Number,
    userName: String,
    createdAt: { type: Date, required: false, default: Date.now }
    
});
// defining schema for places
var PlaceSchema = new mongoose.Schema({
	namePlace: String,
	address: String,
	city: String,
	nameDoc: String,
	comments: [Comments],
	createdAt: { type: Date, required: false, default: Date.now },
	postedBy: [{
	  type: Schema.Types.ObjectId,
      ref: 'User'
	}]
});

// define the model
var Place = mongoose.model("Place", PlaceSchema);

// export the model to any files that `require` this one
module.exports = Place;