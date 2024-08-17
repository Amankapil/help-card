const Card = require("../models/Cardmodel");

// Create a new card
exports.createCard = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newCard = new Card({ title, description });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all cards
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (err) { 
    res.status(500).json({ message: err.message });
  }
};

// Get a specific card by title
exports.getCardByTitle = async (req, res) => {
  try {
    const card = await Card.findOne({ title: req.params.title });
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
