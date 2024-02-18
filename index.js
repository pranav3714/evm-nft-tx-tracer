const { default: mongoose } = require("mongoose");
const { default: Moralis } = require("moralis");
const getRedisClient = require("./src/utils/redis");

require("dotenv").config();
require("./src/cron");

const unexpectedErrorHandler = (error) => {
  console.error(error);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
});
mongoose.connect(process.env.DB_STRING);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to the database");
  await Moralis.start({
    apiKey: process.env.MORALIS_API,
  });
  console.log("Initiated moralis.");
  try {
    await getRedisClient();
    console.log("I am on!");
  } catch (error) {
    console.log("main error: ", error);
  }
});
