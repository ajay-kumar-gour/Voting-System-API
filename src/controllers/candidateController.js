// Import necessary modules and models
const express = require("express");
const Candidate = require("../models/Candidate");

// Create a router instance
const router = express.Router();

// Define the route handler for GET /api/candidates
router.get("/", async (req, res) => {
  try {
    // Fetch all candidates from the database
    const candidates = await Candidate.find();

    // Send the list of candidates as a response
    res.status(200).json({ success: true, candidates });
  } catch (error) {
    // Handle errors
    console.error("Error fetching candidates:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Export the router
module.exports = router;
