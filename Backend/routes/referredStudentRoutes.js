// routes/referredStudentRoutes.js

const express = require("express");
const router = express.Router();
const referredStudentController = require("../controllers/referredStudentController");

// Route to refer a student
router.post("/referstudent", referredStudentController.referStudent);

// Route to get all referred students for a job
router.get(
  "/referredstudents/:jobId",
  referredStudentController.getReferredStudentsByJob
);

// Route to get a specific referred student by ID
router.get(
  "/referredstudent/:id",
  referredStudentController.getReferredStudentById
);

// Route to update the status of a referred student
router.put(
  "/referredstudent/:id",
  referredStudentController.updateReferredStudent
);

// Route to count referred students for a job
router.get(
  "/referredstudentscount/:jobId",
  referredStudentController.getReferredCountByJob
);

router.get(
  "/referredcount/:affiliateId",
  referredStudentController.getReferredCountByAffiliate
);


module.exports = router;
