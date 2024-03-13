// #Authentication controller

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const expiresIn = require("../config/jwt");
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
    if (userData.role == "admin") {
      return res.status(403).send({
        success: false,
        message: "user with admin role is not allowed",
      });
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
        .send({ success: false, message: "Invalid Password, Please check" });
    }

    const payload = {
      name: checkExistingUser.name,
      id: checkExistingUser._id,
      DOB: checkExistingUser.DOB,
      aadhardCardNumber: checkExistingUser.aadhardCardNumber,
      role: checkExistingUser.role,

    };
    console.log("payload", payload);

    const accessToken = jsonwebtoken.sign(payload, SECRET, {
      expiresIn,
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      accessToken,
      expiresIn,
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
    // There's no action needed for logout in JWT since tokens are stateless.
    // You can simply send a success response to the client.
    res.status(200).send({ success: true, message: "User logged out successful" });
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
