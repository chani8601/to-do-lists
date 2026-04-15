const Project = require('../models/Project')

const getAll = async () => Project.find()

const getById = async (id) => Project.findById(id)

const create = async (data) => {
  const project = new Project(data)
  return await project.save()
}

const update = async (id, data) => Project.findByIdAndUpdate(id, data, { new: true })

const remove = async (id) => Project.findByIdAndDelete(id)

const addTask = async (projectId, task) => {
  const project = await Project.findById(projectId)
  project.tasks.push(task)
  return await project.save()
}

const updateTask = async (projectId, taskId, data) => {
  const project = await Project.findById(projectId)
  const task = project.tasks.id(taskId)
  Object.assign(task, data)
  return await project.save()
}

const removeTask = async (projectId, taskId) => {
  const project = await Project.findById(projectId)
  project.tasks.pull(taskId)
  return await project.save()
}

module.exports = { getAll, getById, create, update, remove, addTask, updateTask, removeTask }
