const express = require('express')
const { userLogin, userRegistration } = require('../controllers/userControllers')
const router = express.Router()

router.post('/login', userLogin)
router.post('/register', userRegistration)

module.exports = router