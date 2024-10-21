const express=require('express')
const { registerCompany, verifyEmailOTP, verifyMobileOTP } = require('../controllers/companyControllers')
const router = express.Router()

router.route('/').post(registerCompany)
router.route('/verify-email').post(verifyEmailOTP)
router.route('/verify-phone').post(verifyMobileOTP)

module.exports=router