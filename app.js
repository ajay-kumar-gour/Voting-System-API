// app.js

const express = require("express");
const cors = require("cors");
const connectToDB = require("./src/config/db");
const routes = require("./src/routes/index");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectToDB();
});
