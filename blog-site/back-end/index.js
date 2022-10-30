require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/db");
db.connect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
