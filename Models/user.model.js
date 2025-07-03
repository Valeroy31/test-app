const mongoose = require('mongoose')

const userTwoSchema = mongoose.Schema({
  username: { type: String, required: true, minLength: 5, maxLength: 8, unique: [true, 'Username already taken'] },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6, maxLength: 8 },
  confirmPassword: { type: String, required: true, minLength: 6, maxLength: 8 },
  CreatedAt: { type: Date, default: Date.now() }
})

let userModel = mongoose.model('newUser-model', userTwoSchema)
module.exports = userModel