const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema({
  coordintor_id: {
    type: String,
  },
  project_name: {
    type: String,
  },
  document: [
    {
      type: Object,
    },
  ],
});

const Archive = mongoose.model("ARCHIVE", archiveSchema);
module.exports = Archive;
