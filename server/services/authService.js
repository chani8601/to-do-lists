const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user) throw new Error('User not found')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Invalid credentials')

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' })
  return token
}

const register = async (username, password) => {
  const hashed = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashed })
  await user.save()
  return user
}

module.exports = { login, register }
