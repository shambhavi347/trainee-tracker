const express = require("express");
const router = express.Router();
require("../db/database");
router.use(express.static("../client/src/"));
const Coordinator = require("../model/coordinatorSchema");
const Invitation = require("../model/invitationSchema");
const coordAuthenticate = require("../middleware/coordAuth");
const Class = require("../model/classSchema");
const Student = require("../model/studentSchema");

router.post("/coordinator-reg", async (req, res) => {
  try {
    const {
      salutation,
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      password,
    } = req.body;
    console.log(req.body);
    //checks if all the fields are filled or not
    if (
      !salutation ||
      !first_name ||
      !middle_name ||
      !last_name ||
      !email ||
      !phone ||
      !password
    ) {
      return res
        .status(422)
        .json({ error: "Please fill all the fields properly" });
    }
    // console.log("Success");
    //checks if its a new coordinator registration or not(email exist)
    const coordinatorExist = await Coordinator.findOne({ email: email });
    if (coordinatorExist) {
      return res.status(422).json({ error: "This Email ID already Exists" });
    }

    //coordinator email format checking
    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (email.length > 254) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    var emailValid = emailRegex.test(email);
    if (!emailValid) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    //additional coordinator email validation
    var parts = email.split("@");
    if (parts[0].length > 64) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    var domainParts = parts[1].split(".");
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    ) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    //check coordinator phone format
    const phoneRegex = /^[6-9]\d{9}$/gi;
    const phoneValid = phoneRegex.test(phone);

    if (!phoneValid) {
      return res.status(422).json({ error: "Invalid Phone no.!!\n" });
    }

    //check password format
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordValid = passwordRegex.test(password);
    if (!passwordValid) {
      return res.status(422).json({
        error:
          "Password should be of minimum 8 characters and should contain a digit, an uppercase alphabet,a lowercase alphabet and a special symbol!!",
      });
    }

    //if both key and value are same then you dont need to write name of both like name:name
    const coordinator = new Coordinator({
      salutation,
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      password,
    });
    const coordinatorReg = await coordinator.save();
    if (coordinatorReg) {
      {
        // await Invitation.findOneAndDelete({ email: email });
        res.status(201).json({ message: "You are successfully registered!✌" });
      }
    } else {
      res.status(422).json({ error: "Failed to register☹" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/get-coord-name", coordAuthenticate, async (req, res) => {
  try {
    const id = req.rootUser._id;
    // console.log(id);
    const coor = await Coordinator.findOne({ _id: id });
    // console.log(coor);
    res.send(coor);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-trainee-details", coordAuthenticate, async (req, res) => {
  let trainee_id = [];
  Class.find({ coordinatorID: req.rootUser._id })
    .then((data) => {
      data.map((d, k) => {
        trainee_id.push(d.traineeID);
      });
      Student.find({
        _id: { $in: trainee_id },
      })
        .then((data) => res.send(data))
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
//logout page
router.get("/logout", coordAuthenticate, async (req, res) => {
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
router.post("/change-password-coord", coordAuthenticate, async (req, res) => {
  const { old_pass, new_pass } = req.body;
  // console.log(req.body);

  //checks if all the fields are filled or not
  if (!old_pass || !new_pass) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly" });
  }
  // console.log("Success");
  try {
    //check password is correct
    const coord1 = await Coordinator.findOne({});
    const isMatch = await bcrypt.compare(new_pass, coord1.password);
    if (!isMatch) return res.status(422).json({ error: "Password Incorrect" });

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
    const new_pass_hash = await bcrypt.hash(new_pass, 12);
    //if both key and value are same then you dont need to write name of both like name:name
    const update = await Coordinator.findOneAndUpdate(
      { _id: req.rootUser.id },
      { password: new_pass_hash }
    );

    if (update) {
      res.status(201).json({ message: "Password Updated" });
    } else {
      res.status(422).json({ error: "Failed to update" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
