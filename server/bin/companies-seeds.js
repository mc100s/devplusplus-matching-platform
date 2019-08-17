const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const Company = require('../models/Company')
const JobOffer = require('../models/JobOffer')
const jsonCompanies = require('./data/companies')
const jsonJobOffers = require('./data/jobOffers')

require('../configs/database')
;(async () => {
  try {
    await JobOffer.deleteMany()
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
    let jobOffers = await JobOffer.create(
      jsonJobOffers.map(jsonJobOffer => ({
        ...jsonJobOffer,
        _company: companies.find(
          company => company.name === jsonJobOffer.company
        )._id,
      }))
    )
    console.log(`${jobOffers.length} jobOffers created`)
  } finally {
    mongoose.disconnect()
  }
})()
