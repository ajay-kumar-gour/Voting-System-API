const express = require("express");
const router = express.Router();

const authenticateToken = require("../middlewares/authMiddleware");
const {
  getAllCandidatesController,
  getCandidateByIdController,
  createCandidateController,
  updateCandidateController,
  deleteCandidateController,
  deleteALLCandidateController,
} = require("../controllers/candidateController");

router.get("/candidates", getAllCandidatesController);
router.get("/candidates/:id", getCandidateByIdController);
router.post("/candidates", authenticateToken, createCandidateController);
router.put("/candidates/:id", authenticateToken, updateCandidateController);
router.delete("/candidates/:id", authenticateToken,deleteCandidateController);
router.delete("/candidates", authenticateToken,deleteALLCandidateController);

module.exports = router;
