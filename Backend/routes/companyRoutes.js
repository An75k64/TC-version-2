// routes/companyRoutes.js

const express = require("express");
const { check } = require("express-validator");
const companyController = require("../controllers/companyController");

const router = express.Router();

router.post(
  "/submit-company-form",
  [
    check("companyName")
      .not()
      .isEmpty()
      .withMessage("company name is required"),
    check("industry").not().notEmpty().withMessage("Industry name is required"),
    check("location").not().isEmpty().withMessage("Location is required"),
    check("companySize")
      .isNumeric()
      .withMessage("company Size must be a number"),
    check("contactPerson")
      .not()
      .isEmpty()
      .withMessage("Contact Person is required"),
    check("contactEmail").isEmail().withMessage("Valid email is required"),
    check("contactPhone")
      .isMobilePhone()
      .withMessage("Valid mobile number is required"),
  ],
  companyController.submitCompanyForm
);

//Route to get all the company Form
router.get("/company-forms", companyController.getCompanyForms);

//Route to fetch a single company form by ID
router.get("/company-form/:id", companyController.getcompanyFormById);

//Route to delete the college form 
router.delete("/delete", companyController.deleteCompanyForm);

// Route for getting the count 
router.get("/count", companyController.Count);


module.exports = router;
