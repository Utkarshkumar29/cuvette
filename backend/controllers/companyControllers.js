// controllers/companyController.js
const jwt = require('jsonwebtoken')
const Company = require('../models/companyModel')
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const path = require('path')
const fs = require('fs')


require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

const twilioClient = twilio(process.env.accountSid, process.env.authToken)
let otpStore = {}

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

const registerCompany = async (req, res) => {
    const { name, phoneNo, companyName, companyEmail, employeeSize } = req.body

    try {
        const response = new Company({
            name,
            phoneNo,
            companyName,
            companyEmail,
            employeeSize,
            isEmailVerified: false,
            isPhoneNoVerified: false
        })

        await response.save()

        const otp = generateOTP()
        otpStore[response._id] = { otp, expiresAt: Date.now() + process.env.OTP_EXPIRATION_TIME * 1000 }

        const emailTemplatePath = path.join(__dirname, '../template/otpTemplate.html')
        fs.readFile(emailTemplatePath, 'utf-8', async (err, data) => {
            if (err) {
                console.error('Error reading email template:', err)
                return res.status(500).json({ message: 'Error sending verification email' })
            }

            const emailHTML = data.replace('{{companyName}}', companyName).replace('{{otp}}', otp)

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: companyEmail,
                subject: 'Email Verification',
                html: emailHTML
            }

            transporter.sendMail(mailOptions, async (error) => {
                if (error) {
                    console.error('Error sending email:', error)
                    return res.status(500).json({ message: 'Error sending verification email' })
                }

                try {
                    await twilioClient.messages.create({
                        body: `Your verification OTP is: ${otp}. It is valid for 5 minutes.`,
                        from: process.env.phone,
                        to: phoneNo
                    })

                    const token = jwt.sign({ companyId: response._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

                    res.status(201).json({
                        success: true,
                        message: 'Company registered successfully. Please verify your email and phone.',
                        companyId: response._id,
                        token
                    })

                } catch (smsError) {
                    console.error('Error sending SMS:', smsError)
                    res.status(500).json({ message: 'Error sending verification SMS' })
                }
            })
        })
    } catch (error) {
        console.error('Server error:', error)
        res.status(500).json({ message: 'Server error' })
    }
}


const verifyEmailOTP = async (req, res) => {
    const {companyId,emailOTP} = req.body
    const storedOtp = otpStore[companyId]
    console.log(storedOtp.otp,emailOTP)
    if (!storedOtp || storedOtp.expiresAt<Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' })
    }
    
    if (storedOtp.otp !== emailOTP) {
        return res.status(400).json({ message: 'Incorrect OTP' })
    }
    await Company.findByIdAndUpdate(companyId,{isEmailVerified:true})
    res.status(200).json({ message: 'Phone and email verified successfully' })
}

const verifyMobileOTP = async (req, res) => {
    const { companyId, phoneOTP } = req.body
    const storedOtp = otpStore[companyId]
    console.log(storedOtp.otp,phoneOTP)
    if (!storedOtp || storedOtp.expiresAt < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' })
    }

    if (storedOtp.otp !== phoneOTP) {
        return res.status(400).json({ message: 'Incorrect OTP' })
    }
    await Company.findByIdAndUpdate(companyId, { isVerified: true })
    res.status(200).json({ message: 'Phone number verified successfully' })
}


module.exports = { registerCompany, verifyEmailOTP, verifyMobileOTP }
