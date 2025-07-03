const express = require('express')
const router = express.Router()
const userModel = require('../Models/user.model')

const { fetchUserPage, fetchLoginPage, postLoginPage, getDashboardPage, postDashboardPage } = require('../Controller/user.controller')
router.get('/signup', fetchUserPage)

router.get('/login', fetchLoginPage )

router.post('/login', postLoginPage)

router.get('/dashboard', getDashboardPage);



router.post('/dashboard', postDashboardPage)


module.exports = router