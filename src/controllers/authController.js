// #Authentication controller

const mongoose = require("mongoose");

const User = require("../models/user.model");

const registerController = async (req, res) => {
  // const { name, aadhardCardNumber, age, DOB, password } = req.body;
  const userData = req.body;
  const newUser = new User(userData);
  await newUser.save();
  res.status(201).send({ message: "user registered" });
};
const loginController = (req, res) => {};
const logoutController = (req, res) => {};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
