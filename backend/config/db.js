const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Db connected");
  } catch (error) {
    console.error("Error connecting database : ", error);
  }
}

module.exports = connectDb;
