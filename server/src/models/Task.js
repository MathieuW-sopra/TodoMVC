const mongoose = require('mongoose');

var Task = new mongoose.Schema({
  title: String, 
  completed: Boolean, 
}); 

module.exports = mongoose.model('Task', Task);