const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

router.get('/', projectController.getAll)
router.get('/:id', projectController.getById)
router.post('/', projectController.create)
router.put('/:id', projectController.update)
router.delete('/:id', projectController.remove)

router.post('/:id/tasks', projectController.addTask)
router.put('/:id/tasks/:taskId', projectController.updateTask)
router.delete('/:id/tasks/:taskId', projectController.removeTask)

module.exports = router
