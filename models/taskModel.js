// taskModel.js
const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'], 
    default: 'todo', 
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set createdAt to the current date
  },
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

// Export the model
module.exports = Task;