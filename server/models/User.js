const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: String,
    picture: String,
    isCandidate: { type: Boolean, default: false },
    isRecruiter: { type: Boolean, default: false },
    personalInfo: {
      firstName: String,
      lastName: String,
      nationality: String,
      phone: String,
      description: String,
    },
    skills: [
      {
        name: String,
        level: { type: Number, min: 0, max: 3, default: 0 },
      },
    ],
    projects: [{ name: String, pictures: [String], description: String }],
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User
