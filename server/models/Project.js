const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['To Do', 'In Progress', 'Testing', 'Done'], default: 'To Do' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  dueDate: String
})

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  tasks: [taskSchema]
})

module.exports = mongoose.model('Project', projectSchema)
