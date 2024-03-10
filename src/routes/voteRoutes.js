const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");

const { castVoteController } = require("../controllers/voteController");
router.post("/cast-vote", castVoteController);

module.exports = router;
