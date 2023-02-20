const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const DB = process.env.DATABASE;
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config1.env" });

mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection successfull`);
  })
  .catch((err) => console.log(err));
