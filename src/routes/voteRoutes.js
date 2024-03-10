const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");

const {
  castVoteController,
  showLiveVoteCount,
} = require("../controllers/voteController");
router.post("/cast-vote/:id", authenticateToken, castVoteController);
router.get("/live-vote-count", showLiveVoteCount);

module.exports = router;
