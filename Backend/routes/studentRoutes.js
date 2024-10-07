const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  viewResume,
  downloadResume,
  exportToExcel,
  deleteResumes,
} = require("../controllers/studentController");

router.get("/getAllStudents", getAllStudents);
router.get("/getStudent/:id", getStudentById);
router.get("/viewResume/:id", viewResume); // New route for viewing resumes
router.get("/downloadResume/:id", downloadResume);
router.post("/exportToExcel", exportToExcel);
router.post("/delete", deleteResumes);

module.exports = router;
