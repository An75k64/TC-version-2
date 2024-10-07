const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");

// Route for creating a single card
router.post("/cards", cardController.createCard);

// Route for creating multiple cards
router.post("/cards/bulk", cardController.createCards);

// Route for retrieving all cards
router.get("/cards", cardController.getCards);

// Route for retrieving a single card by jobId
router.get("/cards/:jobId", cardController.getCardByJobId);

// Route for updating a card by jobId
router.put("/cards/:jobId", cardController.updateCard);

// Route for deleting a card by jobId
router.delete("/cards", cardController.deleteCards);

// Route for getting the count 
router.get("/count", cardController.Count);

// Add the new route for fetching location suggestions
router.get('/locations', cardController.getLocationSuggestions);

module.exports = router;
