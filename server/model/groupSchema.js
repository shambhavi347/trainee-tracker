const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinatorID: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Object,
      // default: [],
      // required: true,
    },
  ],
});

const Group = mongoose.model("GROUP", groupSchema);
module.exports = Group;
