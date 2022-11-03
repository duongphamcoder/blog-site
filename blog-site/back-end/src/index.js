require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes/index");
route(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    console.log("App running on port " + PORT);
  } catch (error) {
    console.log(error);
  }
});
