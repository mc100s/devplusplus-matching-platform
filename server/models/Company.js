const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  links: [
    {
      website: { type: String, required: true, enum: ['wttj', 'linkedin'] },
      value: { type: String, required: true },
    },
  ],
  foundedYear: Number,
  employees: Number,
  genderBreakdown: String,
  avgAge: Number,
  categories: [String],
  cities: [String],
  website: String,
  addresses: [String],
  techTools: [String],
})

module.exports = mongoose.model('Company', companySchema)
