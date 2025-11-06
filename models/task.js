const mongoose = require('mongoose');    
mongoose.connect(`mongodb://127.0.0.1:27017/mydatabase`);

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: {type:Date,dafault: Date.now()},
  description:{type:String},
  labelcolor:{type:String},
  status: { type: String, enum: ["pending", "completed"], default: "pending" },

  user: {type: String,default:"Anika"}
});

module.exports = mongoose.model('Task', taskSchema);