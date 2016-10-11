var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/gleeat");
module.exports.Place = require("./place");
module.exports.User = require("./user");