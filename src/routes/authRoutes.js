//  # Authentication routes
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/register", registerController);

module.exports = router;
