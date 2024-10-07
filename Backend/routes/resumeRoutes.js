const express = require("express");
const multer = require("multer");
const {
  submitResume,
  getResumes,
  getResumeById,
  Count,
} = require("../controllers/resumeController");
const { body, validationResult } = require("express-validator");
const path = require("path");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PDF and DOCX files are allowed!"),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Route to submit resume
router.post(
  "/submit",
  upload.single("resume"),
  [
    body("name")
      .isString()
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("Name should only contain letters and spaces.")
      .isLength({ min: 1 })
      .withMessage("Name is required and should be a string."),
    body("email")
      .isEmail()
      .withMessage("Valid email is required")
      .custom((value) => {
        if (!value.endsWith("@gmail.com")) {
          throw new Error("Email must be a Gmail address");
        }
        return true;
      }),
    body("phone")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be exactly 10 digits")
      .isNumeric()
      .withMessage("Phone number must contain only numbers"),
  ],
  submitResume
);

// Route to get all resumes
router.get("/getResumes", getResumes);

// Route to fetch a single resume by ID
router.get("/getResume/:id", getResumeById);

// Route for getting the count 
router.get("/count", Count);


module.exports = router;
