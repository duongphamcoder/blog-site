require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    console.log("App running on port " + PORT);
  } catch (error) {
    console.log(error);
  }
});
