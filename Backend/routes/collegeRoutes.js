// routes/collegeRoutes.js

const express = require("express");
//const { check } = require("express-validator");
const collegeController = require("../controllers/collegeController");

const router = express.Router();

router.post("/submit-college-form", collegeController.submitCollegeForm);

//Route to get all the college Form
router.get("/college-forms", collegeController.getCollegeForms);

//Route to fetch a single college form by ID
router.get("/college-form/:id", collegeController.getCollegeFormById);

//Route to delete the college form 
router.delete("/delete", collegeController.deleteCollegeForm);

// Route for getting the count 
router.get("/count", collegeController.Count);

module.exports = router;
