// routes/affiliateRoutes.js

const express = require("express");
const {
  createAffiliate,
  loginAffiliate,
  getAffiliateProfile,
  changePassword,
  
} = require("../controllers/affiliateController");

const router = express.Router();

// Route to create a new affiliate
router.post("/", createAffiliate);

// Route to log in an affiliate
router.post("/login", loginAffiliate);

// Get affiliate profile by ID (Protected route, ensure only authenticated users can access this)
router.get("/profile/:id", getAffiliateProfile);

// Add route for changing password
router.post("/change-password", changePassword);

module.exports = router;
