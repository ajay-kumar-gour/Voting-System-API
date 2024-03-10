// # Route loader
const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const candidateRoutes = require("./candidateRoutes");

const voteRoutes = require("./voteRoutes");
router.use("/api/auth", authRoutes);
router.use("/api", candidateRoutes);
router.use("/api/votes", voteRoutes);

module.exports = router;
