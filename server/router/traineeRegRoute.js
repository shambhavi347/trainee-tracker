const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/database");
router.use(express.static("../client/src/"));
const student = require("../model/studentSchema");
const trainee = require("../model/traineeSchema");
const traineeAuthenticate = require("../middleware/traineeauth");

//trainee Regestration
router.post("/trainee-reg", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    console.log(req.body);

    //first validation - fileds not empty
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Field not filled properly in login page " });
    }

    // second -- format checking

    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (email.length > 254) {
      return res.status(422).json({ error: "Fill the Email ID correctly !!" });
    }

    var emailValid = emailRegex.test(email);
    if (!emailValid) {
      return res.status(422).json({ error: "Fill the Email ID correctly !!" });
    }

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64) {
      return res.status(422).json({ error: "Fill the Email ID correctly !!" });
    }

    var domainParts = parts[1].split(".");
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    ) {
      return res.status(422).json({ error: "Fill the Email ID correctly !!" });
    }

    //third -- email !exist in trainee db

    const userExist = await trainee.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email Id already Exist !!" });
    }

    // forth -- check password format

    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const passwordValid = passwordRegex.test(password);

    if (!passwordValid) {
      return res.status(422).json({
        error:
          "Min 8 letter password, with at least a symbol, upper and lower case letters and a number !!",
      });
    }

    //fifth if email exist in student db

    const traineeRegestration = await student.findOne({ email: email });

    if (traineeRegestration) {
      token = await traineeRegestration.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
    } else {
      return res
        .status(422)
        .json({ error: "Fill, already registered Email !!" });
    }

    const user = new trainee({
      email,
      password,
    });
    await user.save();
    res.status(201).json({ message: "Trainee registered successfully !!" });
  } catch (err) {
    console.log(err);
  }
});

// logout page

router.get("/trainee-logout", traineeAuthenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currtoken) => {
      return currtoken.token != req.token;
    });
    res.clearCookie("jwtoken");
    console.log("log out successfully");
    await req.rootUser.save();
    res.render("/");
  } catch (err) {
    res.status(500).send(err);
  }
});

//change password
router.post(
  "/change-password-trainee",
  traineeAuthenticate,
  async (req, res) => {
    const { old_pass, new_pass } = req.body;
    console.log(req.body);

    //checks if all the fields are filled or not
    if (!old_pass || !new_pass) {
      return res
        .status(422)
        .json({ error: "Please fill all the fields properly" });
    }
    // console.log("Success");
    try {
      //check password is correct
      const traineee = await trainee.findOne({});
      if (!traineee.password === old_pass)
        return res.status(422).json({ error: "Password Incorrect" });

      //check password format
      const passwordRegex =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      const passwordValid = passwordRegex.test(new_pass);
      if (!passwordValid) {
        return res.status(422).json({
          error:
            "Password should be of minimum 8 characters and should contain a digit, an uppercase alphabet,a lowercase alphabet and a special symbol!!",
        });
      }

      //if both key and value are same then you dont need to write name of both like name:name
      const update = await trainee.findOneAndUpdate(
        { _id: req.rootUser.id },
        { password: new_pass }
      );

      if (update) {
        res.status(201).json({ message: "Password Updated" });
      } else {
        res.status(500).json({ error: "Failed to update" });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/student-data", traineeAuthenticate, async (req, res) => {
  try {
    const ID = req.rootUser.id;
    const Trainee = await trainee.findOne({ _id: ID });

    res.send(Trainee);
  } catch (error) {
    console.log(error);
  }
});

// router.get("/get-pending-student", Authenticate, async (req, res) => {
//   try {
//     const id = req.rootUser._id;
//     const inst = await Trainee.findOne({ trainee_id: id });
//     const class = await Trainee.find({coord_id : inst.coord_id});
//     res.send(class);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
