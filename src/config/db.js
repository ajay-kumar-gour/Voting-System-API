// # Database configuration

const mongoose = require("mongoose");

require("dotenv").config();

const DB_LOCAL_URI = process.env.DB_LOCAL_URI;
const DB_NAME = process.env.DB_NAME;

const connectionURI = `${DB_LOCAL_URI}/${DB_NAME}`;

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(connectionURI);

    console.log(
      "connncted to DATABASE:",
      connection.connections[0]._connectionString
    );
  } catch (erorr) {
    console.log("Error connect to Database:", erorr);
  }
};

module.exports = connectToDB;
