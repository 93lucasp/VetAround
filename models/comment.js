var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
	User 		= require("./user");

// defining schema for places
var CommentSchema = new mongoose.Schema({
	comment: String,
	rate: Number,
	createdAt: { type: Date, required: false, default: Date.now },
	postedBy: [{
	  type: Schema.Types.ObjectId,
      ref: 'User'
	}]
});

// define the model
var Comment = mongoose.model("Comment", CommentSchema);

// export the model to any files that `require` this one
module.exports = Comment;