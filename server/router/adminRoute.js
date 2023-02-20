const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/database");
router.use(express.static("../client/src/"));
const Admin = require("../dbmodel/admin");
const Institute = require("../dbmodel/instituteSchema");

//adminlogin
router.post("/admin-login", async (req, res) => {
  const { user } = req.body;
  if (user === "admin") {
    try {
      let token;
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Field not filled properly in login page " });
      }

      const adminLogin = await Admin.findOne({ email: email });

      if (adminLogin) {
        token = await adminLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

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

//insitutelogin
/*router.post("/admin-login", async (req, res) => {
  const { user } = req.body;
  if (user === "institute") {
    try {
      let token;
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Field not filled properly in login page " });
      }

      const adminLogin = await Admin.findOne({ email: email });

      if (adminLogin) {
        token = await adminLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

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
});*/

//coordinatorlogin
/*router.post("/admin-login", async (req, res) => {
  const { user } = req.body;
  if (user === "institute") {
    try {
      let token;
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Field not filled properly in login page " });
      }

      const adminLogin = await Admin.findOne({ email: email });

      if (adminLogin) {
        token = await adminLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

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
});*/ 

module.exports = router;
