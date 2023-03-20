const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  coordinatorID: {
    type: String,
    required: true,
  },
  traineeID: {
    type: String,
    required: true,
  },
});

const Class = mongoose.model("CLASS", classSchema);
module.exports = Class;
