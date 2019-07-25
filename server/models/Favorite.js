const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
  _favorite: { type: mongoose.Schema.ObjectId, ref: 'User' },
  _favoriteBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
})

favoriteSchema.index({ _favorite: 1, _favoriteBy: 1 }, { unique: true })

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorite
