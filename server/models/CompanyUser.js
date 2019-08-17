const mongoose = require('mongoose')

const companyUserSchema = new mongoose.Schema({
  _company: { type: mongoose.Schema.ObjectId, ref: 'Company' },
  _user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  companyGrade: { type: String },
  applicationStage: { type: String },
  comments: { type: String },
})

module.exports = mongoose.model('CompanyUser', companyUserSchema)
