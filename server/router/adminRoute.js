const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const adminAuthenticate = require("../middleware/adminauth");

require("../db/database");
router.use(express.static("../client/src/"));
const Admin = require("../model/admin");
const Institute = require("../model/instituteSchema");
const Trainee = require("../model/traineeSchema");

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
    console.log(inst);
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
