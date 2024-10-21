
const Job = require('../models/jd')
const nodemailer = require('nodemailer')

require('dotenv').config()

const fs = require('fs');
const path = require('path');

const jobDetails = async (req, res) => {
  try {
    const { jobTitle, jobDescription, experienceLvl, candidates, endDate, postedBy } = req.body;
    
    const job = new Job({
      jobTitle,
      jobDescription,
      experienceLvl,
      candidates,
      endDate,
      postedBy
    });
    await job.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Read the HTML template file
    const emailTemplatePath = path.join(__dirname, '../template/jobDetailTemplate.html');
    fs.readFile(emailTemplatePath, 'utf-8', (err, html) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading email template' });
      }

      // Replace placeholders in the HTML with actual job details
      const formattedHtml = html
        .replace('{{jobTitle}}', jobTitle)
        .replace('{{postedBy}}', postedBy)
        .replace('{{experienceLvl}}', experienceLvl)
        .replace('{{endDate}}', endDate)
        .replace('{{jobDescription}}', jobDescription);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: candidates.join(','),
        subject: `New Job Opportunity: ${jobTitle}`,
        html: formattedHtml // Use the formatted HTML
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: 'Error sending email' });
        }
        res.status(200).json({ message: 'Job posted and emails sent successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}





const getAllJobs = async (req, res) => {
    try {
      const jobs = await Job.find()
      res.status(200).json(jobs)
    } catch (error) {
      console.error(error)
      res.status(500).json({ jobs:jobs,message: 'Failed to retrieve jobs.' })
    }
}

const getJobsForCandidate = async (req, res) => {
  try {
    const { userId } = req.params
    const jobs = await Job.find({ candidates: userId }).populate('candidates')
    res.status(200).json(jobs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getJobsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params
    const jobs = await Job.find({ postedBy: companyId }).populate('postedBy')
    res.status(200).json(jobs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


module.exports = { jobDetails,getAllJobs,getJobsForCandidate,getJobsByCompany}
