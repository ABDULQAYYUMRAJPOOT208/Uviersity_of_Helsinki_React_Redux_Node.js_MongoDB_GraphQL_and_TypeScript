const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const URL = `mongodb+srv://koodarx:${process.env.DB_PASSWD}@cluster0.a52cc.mongodb.net/MERN_UNI`;

const con = mongoose
  .connect(URL)
  .then((response) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
module.exports = con;
