const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  coordinator_id: {
    type: String,
    require: true,
  },
  group_id: {
    type: String,
  },
  document: [
    {
      type: Object,
    },
  ],
});

const Project = mongoose.model("PROJECT", projectSchema);
module.exports = Project;
