const mongoose = require('mongoose')

const jobOfferSchema = new mongoose.Schema({
  _company: { type: mongoose.Schema.ObjectId, ref: 'Company' },
  title: { type: String, required: true },
  link: String,
  published: Date,
})

module.exports = mongoose.model('JobOffer', jobOfferSchema)
