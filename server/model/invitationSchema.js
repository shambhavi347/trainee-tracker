const mongoose = require("mongoose");
const validator = require("validator");

const invitationSchema = new mongoose.Schema({
  salutation: {
    type: String,
    enum: ["Mr", "Mrs", "Ms", "Dr"],
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    // required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid ");
      }
    },
  },
  date: {
    type: Date,
    required: true,
  },
});

const Invitation = mongoose.model("INVITATION", invitationSchema);
module.exports = Invitation;
