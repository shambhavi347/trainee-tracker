const mongoose = require("mongoose");

const DB =
  "mongodb+srv://TraineeTracker:TraineeTracker2023@cluster0.ctu5mli.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection successfull`);
  })
  .catch((err) => console.log(err));
