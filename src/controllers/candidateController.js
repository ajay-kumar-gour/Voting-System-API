const Candidate = require("../models/candidate.model");

const createCandidateController = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }
    // Extract candidate data from the request body
    const { name, party, manifesto } = req.body;
    // Check if required fields are missing
    if (!name || !party) {
      return res
        .status(400)
        .json({ message: "Name and party are required fields" });
    }

    // Check if a candidate with the same party name already exists
    const existingCandidate = await Candidate.findOne({ party });

    // If a candidate with the same party name already exists, send a 409 Conflict response
    if (existingCandidate) {
      return res.status(409).json({
        message: "A candidate with the same party name already exists",
      });
    }
    // Create a new candidate object
    const newCandidate = new Candidate({
      name,
      party,
      manifesto,
    });

    // Save the new candidate to the database
    const savedCandidate = await newCandidate.save();

    // Send the newly created candidate in the response
    res.status(201).json({
      success: true,
      messages: "candidate created successfully",
      createdCandidateDetails: savedCandidate,
      JWTDecodedData: req.decodedData,
    });
  } catch (error) {
    // If an error occurs during the database operation, send a 500 Internal Server Error response
    console.error("Error creating candidate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllCandidatesController = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ message: "No candidates found" });
    }

    res.status(200).json(candidates);
  } catch (error) {
    // If an error occurs during the database operation, send a 500 Internal Server Error response
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCandidateByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the candidate ID is passed as a route parameter

    // Fetch the candidate from the database by ID
    const candidate = await Candidate.findById(id);

    // If the candidate with the specified ID is not found, send a 404 Not Found response
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // If the candidate is found, send it in the response
    res.status(200).json(candidate);
  } catch (error) {
    // If an error occurs during the database operation, send a 500 Internal Server Error response
    console.error("Error fetching candidate by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCandidatesController,
  getCandidateByIdController,
  createCandidateController,
};
