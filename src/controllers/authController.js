// #Authentication controller

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const SECRET = process.env.SECRET;
const registerController = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData || Object.keys(userData).length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "Request body is missing or empty" });
    }

    const newUser = new User(userData);
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData || Object.keys(userData).length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "Request body is missing or empty" });
    }

    const checkExistingUser = await User.findOne({
      aadhardCardNumber: userData.aadhardCardNumber,
    });
    // console.log(checkExistingUser);
    if (!checkExistingUser) {
      return res.status(404).send({
        success: false,
        message: "User does not exist with provided aadhardCardNumber",
      });
    }
    const isValidPassword = await bcrypt.compare(
      userData.password,
      checkExistingUser.password
    );

    if (!isValidPassword) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Password" });
    }

    const payload = {
      name: checkExistingUser.name,

      DOB: checkExistingUser.DOB,
      aadhardCardNumber: checkExistingUser.aadhardCardNumber,
    };
    console.log("payload", payload);

    const accessToken = jsonwebtoken.sign(payload, SECRET, {
      expiresIn: "30m",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      accessToken,
      checkExistingUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const logoutController = async (req, res) => {
  try {
    // Implementation logic for user logout
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
