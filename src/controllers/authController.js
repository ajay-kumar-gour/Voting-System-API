// #Authentication controller

const mongoose = require("mongoose");

const User = require("../models/user.model");

const registerController = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData || Object.keys(userData).length === 0) {
      return res
        .status(400)
        .send({ message: "Request body is missing or empty" });
    }

    const newUser = new User(userData);
    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


const loginController = (req, res) => {};
const logoutController = (req, res) => {};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
