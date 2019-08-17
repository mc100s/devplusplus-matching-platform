const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const Company = require('../models/Company')
const JobOffer = require('../models/JobOffer')
const CompanyUser = require('../models/CompanyUser')

router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user,
  })
})

router.get('/my-applications-dashboard', isLoggedIn, async (req, res, next) => {
  let [companies, jobOffers, companyUsers] = await Promise.all([
    Company.find(),
    JobOffer.find(),
    CompanyUser.find({ _user: req.user._id }),
  ])
  res.json({ companies, jobOffers, companyUsers })
})

module.exports = router
