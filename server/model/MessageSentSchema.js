const mongoose = require("mongoose");
// const multer = require("multer");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const MessageSentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  coord_id: {
    type: String,
  },
  sender_name: {
    type: String,
  },
  trainee_list_id: [
    {
      type: String,
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//generating token - login
MessageSentSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const MessageSent = mongoose.model("Message Sent", MessageSentSchema);
module.exports = MessageSent;
