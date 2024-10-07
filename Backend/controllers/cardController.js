const Card = require("../models/Card");

// Function to generate a unique jobId
const generateUniqueJobId = async (title) => {
  if (!title || typeof title !== "string") {
    throw new Error(
      "Title is required and must be a string to generate a unique jobId."
    );
  }

  const prefix = title.substring(0, 2).toUpperCase();
  let randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit random number
  let jobId = `${prefix}${randomNumber}`;

  // Ensure the jobId is unique
  while (await Card.exists({ jobId })) {
    randomNumber = Math.floor(100000 + Math.random() * 900000);
    jobId = `${prefix}${randomNumber}`;
  }

  return jobId;
};

// Create a new card
exports.createCard = async (req, res) => {
  try {
    const {
      title,
      location,
      salary,
      experience,
      jobDescription,
      jobRole,
      department,
      roleCategory,
      employmentType,
      education,
      englishLevel,
      gender,
    } = req.body;

    // Validate title
    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Title is required and must be a string." });
    }

    // Generate a unique jobId
    const jobId = await generateUniqueJobId(title);

    // Create a new card instance with the generated jobId
    const card = new Card({
      jobId,
      title,
      location,
      salary,
      experience,
      jobDescription,
      jobRole,
      department,
      roleCategory,
      employmentType,
      education,
      englishLevel,
      gender,
    });

    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create multiple cards
exports.createCards = async (req, res) => {
  try {
    const cards = req.body;

    // Ensure the request body is an array
    if (!Array.isArray(cards)) {
      return res
        .status(400)
        .json({ error: "Input should be an array of cards" });
    }

    // Generate unique jobIds for each card and save them
    const cardPromises = cards.map(async (cardData) => {
      if (!cardData.title || typeof cardData.title !== "string") {
        throw new Error("Each card must have a valid title.");
      }

      const jobId = await generateUniqueJobId(cardData.title);
      const card = new Card({ ...cardData, jobId });
      return card.save();
    });

    // Wait for all cards to be saved
    const savedCards = await Promise.all(cardPromises);

    res.status(201).json(savedCards);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all cards
exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 }); 
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single card by jobId
exports.getCardByJobId = async (req, res) => {
  try {
    const card = await Card.findOne({ jobId: req.params.jobId });
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a card
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findOneAndUpdate(
      { jobId: req.params.jobId },
      req.body,
      {
        new: true,
      }
    );
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.status(200).json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete multiple cards
exports.deleteCards = async (req, res) => {
  try {
    console.log(req.body); // Log the request body to check its format
    const { jobId } = req.body;

    if (!Array.isArray(jobId) || jobId.length === 0) {
      return res
        .status(400)
        .json({ error: "No jobIds provided or invalid format" });
    }

    const result = await Card.deleteMany({ jobId: { $in: jobId } });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "No cards found for the provided jobIds" });
    }

    res.status(200).json({ message: `${result.deletedCount} cards deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get the count 
exports.Count = async (req, res) => {
   try {    
     const count = await Card.countDocuments({ });
     res.status(200).json({count });
   } catch (error) {
     console.error("Error fetching the number of count:", error);
     res
       .status(500)
       .json({
         message: "Error fetching the number of count",
         error: error.message,
       });
   }
};

// Function to fetch location suggestions
exports.getLocationSuggestions = async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }

        // Fetch distinct locations that start with the query
        const locations = await Card.find({
            location: { $regex: `^${query}`, $options: 'i' } // Case-insensitive matching
        }).distinct('location');

        if (locations.length === 0) {
            return res.status(404).json({ message: "No job openings available at this location" });
        }

        res.status(200).json(locations);
    } catch (error) {
        console.error('Error fetching location suggestions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
