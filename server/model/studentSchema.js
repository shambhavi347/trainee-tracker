const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
  prefix: {
    type: String,
    enum: ["Mr", "Mrs", "Miss", "Dr"],
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
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
  dob: {
    type: Date,
    required: true,
  },
  phone_no: {
    type: Number,
    unique: true,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Binary"],
    required: true,
  },
  instname: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    enum: ["BCA", "MCA", "BTech", "MTech"],
    required: true,
  },
  stream: {
    type: String,
    enum: [
      "Aeronautical Engineering",
      "Automobile Engineering",
      "Biotechnology",
      "Civil Engineering",
      "Computer Application",
      "Electronics & Communication",
      "Mechanical Engineering",
      "Electrical and Electronics Engineering",
      "Computer Science and Engineering",
    ],
    required: true,
  },
  semester: {
    type: String,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
    required: true,
  },
  cgpa: {
    type: Number,
    min: 3,
    max: 10,
    required: true,
  },
  passout_year: {
    type: Number,
    min: 1887,
    max: 3000,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "selection pending", //student apply but admin ki side
      "selection accept", //student application accepted by admin
      "selection reject", //student application rejected by admin
      "mail sent", //accepted by student
      "mail not sent", //reject by student
      "registered", //student resgistration as a trainee
      "assigned", //coordinator assigned by admin
    ],
    required: true,
  },
  fileID: {
    type: String,
    required: true,
  },
  group: {
    type: String,
  },
  famtech: [
    {
      type: String,
      required: true,
    },
  ],
  inttech: [
    {
      type: String,
      required: true,
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
//hashing password
// instituteSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//   }
//   next();
// });

//generating token
studentSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const Student = mongoose.model("STUDENT", studentSchema);
module.exports = Student;
