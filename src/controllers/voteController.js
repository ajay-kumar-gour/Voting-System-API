const Candidate = require("../models/candidate.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const castVoteController = async (req, res) => {
  try {
    // Extract the candidate ID from the request parameters
    const { id } = req.params;
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid candidate ID" });
    }

    // Find the candidate by ID in the database
    const candidate = await Candidate.findById(id);

    // If the candidate does not exist, return a 404 Not Found response
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Increment the votes for the candidate by 1 and save the updated candidate
    candidate.countOfVotes += 1;
    await candidate.save();

    // Return a success message
    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    // If an error occurs during the database operation, send a 500 Internal Server Error response
    console.error("Error casting vote:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { castVoteController };
