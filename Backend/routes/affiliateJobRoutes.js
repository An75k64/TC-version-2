// routes/jobRoutes.js
const express = require("express");
const {
  createJob,
  getJobs,
  deleteJob,
  getJobByAffiliateId,
  editJobById,
  countJobsByAffiliateId,
  getJobById
} = require("../controllers/affiliateJobController");

const router = express.Router();

// POST /api/jobs - Create a new job
router.post("/", createJob);

// GET /api/jobs - Get all jobs
router.get("/", getJobs);

// DELETE /api/jobs/:id - Delete a job by ID
router.delete("/:id", deleteJob);

// Route for getting job by Affiliate ID
router.get("/:id", getJobByAffiliateId);

// Route for getting job by ID
router.get('/job/:id', getJobById);

// Route for editing a job
router.put('/:jobId', editJobById);

// Route for counting jobs by affiliateId
router.get('/count/:affiliateId', countJobsByAffiliateId);


module.exports = router;
