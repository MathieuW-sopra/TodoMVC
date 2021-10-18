const mongoose = require("mongoose");

var User = new mongoose.Schema({
  email: String, 
  password: String, 
}); 

module.exports = mongoose.model("User", User);