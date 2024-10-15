// routes/affiliateRoutes.js

const express = require("express");
const {
  createAffiliate,
  loginAffiliate,
} = require("../controllers/affiliateController");

const router = express.Router();

// Route to create a new affiliate
router.post("/", createAffiliate);

// Route to log in an affiliate
router.post("/login", loginAffiliate);

module.exports = router;
