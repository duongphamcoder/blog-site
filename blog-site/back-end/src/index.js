require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors=require("cors");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))


const route = require("./routes/index");
route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});

module.exports = app;
