const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = mongoDB;
