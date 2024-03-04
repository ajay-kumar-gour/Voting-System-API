// # Route loader
const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");

router.use("/api/auth", authRoutes);
router.use("/api/auth", candidateRoutes);

module.exports = router;
