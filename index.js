const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//  const sigupModal = require("./modals/signup");

const bcrypt = require("bcrypt")
var collection ;
mongoose.set('strictQuery', true);
mongoose
  .connect("mongodb://localhost:27017/loginform", { useNewUrlParser: true })
  .then((data) => console.log("server is connected to mongodb"))
  .catch((err) => console.log(err));
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is up and running on ${port}`));
