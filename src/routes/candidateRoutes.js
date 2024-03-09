const express = require("express");
const router = express.Router();

const authenticateToken = require("../middlewares/authMiddleware");
const {
  getAllCandidatesController,
  getCandidateByIdController,
  createCandidateController,
  updateCandidateController,
} = require("../controllers/candidateController");

router.get("/candidates", getAllCandidatesController);
router.get("/candidates/:id", getCandidateByIdController);
router.post("/candidates", authenticateToken, createCandidateController);
router.put("/candidates/:id", authenticateToken, updateCandidateController);

module.exports = router;
