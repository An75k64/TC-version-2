// routes/jobApplicationRoutes.js
const express = require("express");
const router = express.Router();
const {
  createJobApplication,
  getJobApplications,
  upload,
  getApplicationsCount,
  getJobApplicationsByJobId,
  viewResume,
  downloadResume,
  deleteJobApplication,
  Count,
} = require("../controllers/jobApplicationController");

// POST route to submit a new job application
router.post("/apply", upload.single("resume"), createJobApplication);

// GET route to retrieve all job applications (for the admin panel)
router.get("/", getJobApplications);

// Route for getting the count of applications for a specific job
router.get("/applications/count/:jobId", getApplicationsCount);

// Route to get job applications by jobId
router.get('/applications/:jobId', getJobApplicationsByJobId);

// New route for viewing resumes
router.get("/viewResume/:id", viewResume); 

router.get("/downloadResume/:id", downloadResume);

router.post("/delete", deleteJobApplication);

// Route for getting the count 
router.get("/count", Count);


module.exports = router;
