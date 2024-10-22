// routes/affiliateRoutes.js

const express = require("express");
const {
  createAffiliate,
  loginAffiliate,
  getAffiliateProfile,
  changePassword,
  getAffiliateCount,
  deleteAffiliates,
  getAllAffiliates,
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

// Route to get the total count of affiliates
router.get('/count', getAffiliateCount);

//Route to get all affiliate data
router.get('/', getAllAffiliates);

//Route to delete one or multiple affiliate 
router.delete('/delete', deleteAffiliates);

module.exports = router;
