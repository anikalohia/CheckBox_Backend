import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
  labelcolor: { type: String },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  user: { type: String, default: "Anika" }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;