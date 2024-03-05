const express = require("express");
const router = express.Router();
const {
  getAllCandidatesController,
  getCandidateByIdController,
} = require("../controllers/candidateController");

router.get("/candidates", getAllCandidatesController);
router.get("/candidates/:id", getCandidateByIdController);

module.exports = router;
