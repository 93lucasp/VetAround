var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
	bcrypt      = require('bcrypt');

var UserSchema  = new Schema({
	firstName: 		{type: String, required: true},
	lastName: 		{type: String, required: true},
	email: 			{type: String, required: true},
	passwordDigest: {type: String, required: true},
	createdAt: 		{type: Date, required: false, default: Date.now}
});

var User       = mongoose.model('User', UserSchema);
module.exports = User;