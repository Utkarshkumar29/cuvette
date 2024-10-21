const express=require('express')
const { jobDetails, getAllJobs, getJobsForCandidate, getJobsByCompany } = require('../controllers/jobControllers')
const { protect } = require('../middleware/authmiddleware')
const router = express.Router()

router.route('/').post(jobDetails)
router.route('/').get(getAllJobs)
router.route('/:companyId').get(protect,getJobsByCompany)
router.route('/:userId').get(protect,getJobsForCandidate)


module.exports=router