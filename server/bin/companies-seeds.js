const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const Company = require('../models/Company')
const jsonCompanies = require('./data/companies')

require('../configs/database')
;(async () => {
  try {
    await Company.deleteMany()
    let companies = await Company.create(
      jsonCompanies.map(jsonCompany => ({
        ...jsonCompany,
        links: [{ website: 'wttj', value: jsonCompany.link }],
        avgAge: parseInt(jsonCompany.avgAge),
        techTools: jsonCompany.techTools.sort(),
      }))
    )
    console.log(`${companies.length} companies created`)
  } finally {
    mongoose.disconnect()
  }
})()
