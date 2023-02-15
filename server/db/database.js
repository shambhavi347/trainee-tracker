const mongoose = require("mongoose");

<<<<<<< HEAD
const DB = "mongodb://TraineeTracker:TraineeTracker2023@ac-jevm6vd-shard-00-00.ctu5mli.mongodb.net:27017,ac-jevm6vd-shard-00-01.ctu5mli.mongodb.net:27017,ac-jevm6vd-shard-00-02.ctu5mli.mongodb.net:27017/?ssl=true&replicaSet=atlas-oweky8-shard-0&authSource=admin&retryWrites=true&w=majority";
=======
// const DB =
//   "mongodb+srv://TraineeTracker:TraineeTracker2023@cluster0.ctu5mli.mongodb.net/?retryWrites=true&w=majority";
const DB =
  "mongodb://TraineeTracker:TraineeTracker2023@ac-jevm6vd-shard-00-00.ctu5mli.mongodb.net:27017,ac-jevm6vd-shard-00-01.ctu5mli.mongodb.net:27017,ac-jevm6vd-shard-00-02.ctu5mli.mongodb.net:27017/?ssl=true&replicaSet=atlas-oweky8-shard-0&authSource=admin&retryWrites=true&w=majority";
>>>>>>> 670bf79daacdda4230b23ab0c8b364abafad8ccc

mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection successfull`);
  })
  .catch((err) => console.log(err));
