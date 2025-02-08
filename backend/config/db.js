const mongoose = require("mongoose");
const dotenv=require("dotenv");

dotenv.config({ path: "../.env" });

 const connectDB = () => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("MongoDb Connected");
      })
      .catch((err) => {
        console.log(err);
      });
  };

module.exports = connectDB;