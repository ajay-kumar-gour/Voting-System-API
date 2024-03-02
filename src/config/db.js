// databaseConfig.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB_LOCAL_URI = process.env.DB_LOCAL_URI;
const DB_NAME = process.env.DB_NAME;

const connectionURI = `${DB_LOCAL_URI}/${DB_NAME}`;

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(connectionURI);

    console.log(
      "Connected to database:",
      connection.connections[0]._connectionString
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = connectToDB;
