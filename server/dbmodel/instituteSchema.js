const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const instituteSchema = new mongoose.Schema({
  name: {
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
  month: {
    type: String,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    required: true,
  },
  duration: {
    type: String,
    enum: ["3 Months", "6 Months"],
    required: true,
  },
  rating: {
    type: String,
    enum: ["A++", "A+", "A", "B++", "B+", "B", "C", "D"],
    required: true,
  },
  rvalue: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "Central University",
      "State University",
      "Private Institution",
      "Deemed University",
      "Autonomous College",
      "Affiliated College",
    ],
    required: true,
  },
  street: { type: String },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  phoneno: {
    type: Number,
    unique: true,
    required: true,
  },

  coordName: {
    type: String,
    required: true,
  },
  coordEmail: {
    type: String,
    unique: true,
    required: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid ");
      }
    },
  },
  coordPhone: {
    type: Number,
    unique: true,
    required: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
//hashing password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const Institute = mongoose.model("INSTITUTE", instituteSchema);
module.exports = Institute;
