const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coordinator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coordinator",
    required: true,
    unique: true,
  },
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
    unique: true,
  },
});

const Project = mongoose.model("PROJECT", projectSchema);
module.exports = Project;
