var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
	bcrypt      = require('bcrypt');

var UserSchema  = new Schema({
	nome: 			{type: String},
	cognome: 		{type: String},
	email: 			{type: String},
	passwordDigest: {type: String, required: true},
	createdAt: 		{type: Date, required: false, default: Date.now}
});


// create a new user with secure (hashed) password (for sign up)
UserSchema.statics.createSecure = function (user, cb) {
  console.log("----s-s-s-s-s-", user);
  var _this = this; // `_this` now references our schema
  // generate some salt
  bcrypt.genSalt(function (err, salt) {
    // hash the password with the salt
    bcrypt.hash(user.passwordDigest, salt, function (err, hash) {
      user.passwordDigest = hash; // ashing password
      _this.create(user, cb); // create a new user in the db with hashed password and execute the callback when done
    });
  });
};



var User       = mongoose.model('User', UserSchema);
module.exports = User;