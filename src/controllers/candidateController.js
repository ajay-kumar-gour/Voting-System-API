const Candidate = require("../models/candidate.model");
const mongoose = require("mongoose");
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
    if (!req.decodedData || req.decodedData.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized: Only admin users can create candidates",
      });
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
    const candidates = await Candidate.find({}, " _id name party manifesto");

    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ message: "No candidates found" });
    }

    res.status(200).json({
      success: true,
      message: "candidates successfully fetched",
      totalCandidates: candidates.length,
      candidates: candidates,
    });
  } catch (error) {
    // If an error occurs during the database operation, send a 500 Internal Server Error response
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCandidateByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the candidate ID is passed as a route parameter

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid candidate ID" });
    }

    // Fetch the candidate from the database by ID
    // const candidate = await Candidate.findById(id);
    const candidate = await Candidate.findById(id, "_id name party manifesto");

    // If the candidate with the specified ID is not found, send a 404 Not Found response
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // If the candidate is found, send it in the response
    res.status(200).json({ success: true, candidate });
  } catch (error) {
    // If an error occurs during the database operation, send a 500 Internal Server Error response
    console.error("Error fetching candidate by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCandidateController = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the candidate ID is passed as a route parameter
    const { name, party, manifesto } = req.body; // Extract candidate data from the request body

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid candidate ID" });
    }

    // Check if required fields are missing
    if (!name && !party && !manifesto) {
      return res.status(400).json({
        message:
          "At least one field (name, party, manifesto) must be provided for update",
      });
    }
    if (!req.decodedData || req.decodedData.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized: Only admin users can update candidates",
      });
    }

    // Fetch the candidate from the database by ID
    let candidate = await Candidate.findById(id);

    // If the candidate with the specified ID is not found, send a 404 Not Found response
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Update candidate information if provided
    if (name) candidate.name = name;
    if (party) candidate.party = party;
    if (manifesto) candidate.manifesto = manifesto;

    // Save the updated candidate to the database
    candidate = await candidate.save();

    // Send the updated candidate in the response
    res.status(200).json(candidate);
  } catch (error) {
    // If an error occurs during the database operation, send a 500 Internal Server Error response
    console.error("Error updating candidate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCandidateController = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the candidate ID is passed as a route parameter

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid candidate ID" });
    }
    if (!req.decodedData || req.decodedData.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized: Only admin users can delete candidates",
      });
    }
    // Find the candidate by ID and delete it
    const deletedCandidate = await Candidate.findByIdAndDelete(id);

    // If the candidate with the specified ID is not found, send a 404 Not Found response
    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Send a success message in the response
    return res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    // If an error occurs during the database operation, send a detailed error response
    console.error("Error deleting candidate:", error);
    return res
      .status(500)
      .json({ message: "Error deleting candidate", error: error.message });
  }
};

const deleteALLCandidateController = async (req, res) => {
  try {
    if (!req.decodedData || req.decodedData.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized: Only admin users can delete all candidates",
      });
    }
    // Delete all candidates from the database
    const result = await Candidate.deleteMany({});

    // If no candidates were deleted, send a 404 Not Found response
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No candidates found to delete" });
    }

    // Send a success message in the response
    res.status(200).json({ message: "All candidates deleted successfully" });
  } catch (error) {
    // If an error occurs during the database operation, send a 500 Internal Server Error response
    console.error("Error deleting all candidates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCandidatesController,
  getCandidateByIdController,
  createCandidateController,
  updateCandidateController,
  deleteCandidateController,
  deleteALLCandidateController,
  deleteALLCandidatesController,
};
