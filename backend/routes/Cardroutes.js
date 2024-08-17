const express = require("express");
const router = express.Router();
const cardController = require("../controllers/Cardcontroller");

// Create a card
router.post("/", cardController.createCard);

// Get all cards
router.get("/", cardController.getAllCards);

// Get a specific card by title
router.get("/:title", cardController.getCardByTitle);

module.exports = router;
    