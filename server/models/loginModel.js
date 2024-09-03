
const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  email: { type: String, required: true },
  name: { type: String, required: true},
  password: { type: String, required: true},
  },{
    timestamps: { createdAt: true, updatedAt: false }
})

module.exports = mongoose.model('Login', loginSchema);