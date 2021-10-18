const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var Task = new mongoose.Schema({
  title: String, 
  completed: Boolean, 
}); 
Task.plugin(mongoosePaginate);
module.exports = mongoose.model("Task", Task);