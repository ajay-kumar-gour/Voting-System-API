// # User model

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aadhardCardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender:{
  type: String,
  enum: ["Male", "Female", "Others"],
  required: true
  },
  DOB: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
  password: {
    type: String,
    required: true,
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log(this);
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
  
});

const User = mongoose.model("User", userSchema);
module.exports = User;
