// # Route loader
const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const candidateRoutes = require("./candidateRoutes");

router.use("/api/auth", authRoutes);
router.use("/api", candidateRoutes);
router.use("/api/votes", voteRoutes);

module.exports = router;
