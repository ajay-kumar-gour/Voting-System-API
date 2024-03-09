const express = require("express");
const router = express.Router();
const {
  getAllCandidatesController,
  getCandidateByIdController,
  createCandidateController,
} = require("../controllers/candidateController");

router.get("/candidates", getAllCandidatesController);
router.get("/candidates/:id", getCandidateByIdController);
router.post("/candidates",createCandidateController);

module.exports = router;
