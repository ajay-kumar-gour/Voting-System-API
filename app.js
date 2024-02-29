// # Express app initialization

const express = require("express");
const cors = require("cors");
const connectToDB = require("./src/config/db");
require("dotenv").config();
const routes = require("./src/routes/index");
const PORT = process.env.PORT || 3000;

// console.log(PORT);

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
  connectToDB();
});
