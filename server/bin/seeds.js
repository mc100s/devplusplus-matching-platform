const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Favorite = require('../models/Favorite')

const bcryptSalt = 10

require('../configs/database')

let users = [
  new User({
    email: 'alice@gmail.com',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
    isRecruiter: true,
  }),
  new User({
    email: 'bob@gmail.com',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
    isRecruiter: true,
  }),
  new User({
    email: 'ironman@gmail.com',
    password: bcrypt.hashSync('ironman', bcrypt.genSaltSync(bcryptSalt)),
    picture:
      'https://img.timesnownews.com/story/1560073756-Avengers_Endgame_Iron_Man.jpeg?d=600x450',
    isCandidate: true,
    personalInfo: {
      firstName: 'Tony',
      lastName: 'Stark',
      nationality: 'American',
      phone: '+1 234 567 89 42',
      description: 'Very strong',
    },
  }),
  new User({
    email: 'homer@gmail.com',
    password: bcrypt.hashSync('homer', bcrypt.genSaltSync(bcryptSalt)),
    isCandidate: true,
    picture:
      'https://ogimg.infoglobo.com.br/in/2938418-79f-a41/FT1086A/652/xO-personagem-Homer-SimpsonDivulgacao.jpg.pagespeed.ic.lfGmPMZYKL.jpg',
    personalInfo: {
      firstName: 'Homer',
      lastName: 'Simpson',
      nationality: 'American',
      phone: '+1 234 567 89 43',
      description: 'Donuts...',
    },
  }),
]

let favorites = [
  new Favorite({
    _favorite: users[2],
    _favoriteBy: users[0],
  }),
]

Promise.all([User.deleteMany(), Favorite.deleteMany()])
  .then(() => {
    return Promise.all([User.create(users), Favorite.create(favorites)])
  })
  .then(() => {
    console.log(`${users.length} favorites created`)
    console.log(`${favorites.length} favorites created`)
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
