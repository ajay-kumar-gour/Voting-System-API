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
// Define the route handler for GET /api/candidates/:candidateID
router.get("/:candidateID", async (req, res) => {
  try {
    // Extract candidateID from request parameters
    const { candidateID } = req.params;

    // Find candidate in the database by ID
    const candidate = await Candidate.findById(candidateID);

    // If candidate is not found, return 404 Not Found response
    if (!candidate) {
      return res.status(404).json({ success: false, message: "Candidate not found" });
    }

    // Send candidate information as a response
    res.status(200).json({ success: true, candidate });
  } catch (error) {
    // Handle errors
    console.error("Error fetching candidate:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Export the router
module.exports = router;
