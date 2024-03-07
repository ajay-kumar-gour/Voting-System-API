const Candidate = require("../models/Candidate");

const getAllCandidatesController = async (req, res) => {
  try {
    // Fetch all candidates from the database
    const candidates = await Candidate.find();

    // If no candidates are found, send a 404 Not Found response
    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ message: "No candidates found" });
    }

    // If candidates are found, send them in the response
    res.status(200).json(candidates);
  } catch (error) {
    // If an error occurs during the database operation, send a 500 Internal Server Error response
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCandidateByIdController = (req, res) => {};

module.exports = { getAllCandidatesController, getCandidateByIdController };
