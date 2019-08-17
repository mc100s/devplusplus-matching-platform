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

router.put('/save-all-company-users', isLoggedIn, async (req, res, next) => {
  await CompanyUser.deleteMany({ _user: req.user._id })
  const { companyUsers } = req.body
  for (let i = 0; i < companyUsers.length; i++) {
    companyUsers[i]._user = req.user._id
  }
  let newCompanyUsers = await CompanyUser.create(companyUsers)
  res.json({ companyUsers: newCompanyUsers })
})

module.exports = router
