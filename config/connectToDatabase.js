const mongoose = require("mongoose");
const config = require("config");
const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB is Connected.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
