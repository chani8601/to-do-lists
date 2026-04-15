const authService = require('../services/authService')

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const token = await authService.login(username, password)
    res.json({ token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const register = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await authService.register(username, password)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { login, register }
