const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//  const sigupModal = require("./modals/signup");
const auctionRoute = require("./routes/auctionItems");
const bcrypt = require("bcrypt")
require('dotenv').config()

var collection ;
mongoose.set('strictQuery', true);
mongoose
  .connect(`mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@auction.jtyvwwt.mongodb.net/`, { useNewUrlParser: true })
  .then((data) => console.log("server is connected to mongodb"))
  .catch((err) => console.log(err));
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routes"));


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is up and running on ${port}`)
});
