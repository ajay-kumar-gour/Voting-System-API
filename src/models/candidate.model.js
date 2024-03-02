const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name of the candidate is required
  },
  party: {
    type: String,
    required: true, // Party affiliation is required
  },
  manifesto: {
    type: String, // Manifesto is optional
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);
