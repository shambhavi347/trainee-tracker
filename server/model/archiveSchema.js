const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema({
  coordintor_id: {
    type: String,
  },
  project_name: {
    type: String,
  },
  file_id: {
    type: String,
  },
  file_name: {
    type: String,
  },
});

const Archive = mongoose.model("ARCHIVE", archiveSchema);
module.exports = Archive;
