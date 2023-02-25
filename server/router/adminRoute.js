const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const adminAuthenticate = require("../middleware/adminauth");
const nodemailer = require("nodemailer");

require("../db/database");
router.use(express.static("../client/src/"));
const Admin = require("../model/admin");
const Institute = require("../model/instituteSchema");
const Trainee = require("../model/traineeSchema");
const Student = require("../model/studentSchema");

//adminlogin
router.post("/admin-login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    //first validation - fileds not empty
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Field not filled properly in login page " });
    }

    //second if email exist
    const adminLogin = await Admin.findOne({ email: email });
    const instLogin = await Institute.findOne({ email: email });
    const traineeLogin = await Trainee.findOne({ email: email });

    if (adminLogin) {
      token = await adminLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      //third validation - password matching
      if (password != adminLogin.password) {
        res.status(400).json({ error: "Incorrect Password" });
      } else {
        res.status(200).json({ message: "Admin" });
      }
    } else if (instLogin) {
      token = await instLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      //third validation - password matching
      if (password != instLogin.password) {
        res.status(400).json({ error: "Incorrect Password" });
      } else {
        res.status(200).json({ message: "Institute" });
      }
    } else if (traineeLogin) {
      token = await traineeLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      const isMatch = await bcrypt.compare(password, traineeLogin.password);
      //third validation - password matching
      if (!isMatch) {
        res.status(400).json({ error: "Incorrect Password" });
      } else {
        res.status(200).json({ message: "Trainee" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/get-pending-institute", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Institute.find({ status: "pending" });
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-pending-student", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Student.find({});
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});

router.post("/accept-inst", adminAuthenticate, async (req, res) => {
  try {
    const { email } = req.body;
    await Institute.findOneAndUpdate(
      { email: email },
      { $set: { status: "accept" } }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/reject-inst", adminAuthenticate, async (req, res) => {
  try {
    const { email } = req.body;
    await Institute.findOneAndUpdate(
      { email: email },
      { $set: { status: "reject" } }
    );
  } catch (error) {
    console.log(error);
  }
});

//send mail to accept student
router.post("/send-student-mail", adminAuthenticate, async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "randy67@ethereal.email", // generated ethereal user
        pass: "jgUkDR2nsSUKFHKG1e", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"CDAC Trainee Tracker" <shambhavishanker1999@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Hello from CDAC", // Subject line
      text: "Hello from trainee tracker", // plain text body
      html: "<b>Hello from trainee tracker</b>", // html body
    });
    if (info.messageId) {
      res.send("Mail send");
    } else {
      res.send("Mail not sent");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
