const projectService = require('../services/projectService')

const getAll = async (req, res) => {
  try {
    const projects = await projectService.getAll()
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const project = await projectService.getById(req.params.id)
    if (!project) return res.status(404).json({ message: 'Project not found' })
    res.json(project)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const create = async (req, res) => {
  try {
    const project = await projectService.create(req.body)
    res.status(201).json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const update = async (req, res) => {
  try {
    const project = await projectService.update(req.params.id, req.body)
    res.json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const remove = async (req, res) => {
  try {
    await projectService.remove(req.params.id)
    res.json({ message: 'Project deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addTask = async (req, res) => {
  try {
    const project = await projectService.addTask(req.params.id, req.body)
    res.status(201).json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const project = await projectService.updateTask(req.params.id, req.params.taskId, req.body)
    res.json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const removeTask = async (req, res) => {
  try {
    const project = await projectService.removeTask(req.params.id, req.params.taskId)
    res.json(project)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getAll, getById, create, update, remove, addTask, updateTask, removeTask }
