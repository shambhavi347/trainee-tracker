const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const adminAuthenticate = require("../middleware/adminauth");

require("../db/database");
router.use(express.static("../client/src/"));
const Admin = require("../model/admin");
const Institute = require("../model/instituteSchema");

router.post("/admin-login", async (req, res) => {
  const { user } = req.body;
  if (user === "admin") {
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
          res.status(200).json({ message: "Admin login successfully ✌🏼" });
        }
      } else {
        res.status(400).json({ error: "Invalid Credientials" });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

//get pending institute list
router.get("/get-pending-institute", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Institute.find({ status: "pending" });
    if (inst) {
      console.log(inst);
      res.send(inst);
    } else {
      console.log("none");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
