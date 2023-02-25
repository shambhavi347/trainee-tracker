const express = require("express");
const router = express.Router();
require("../db/database");
router.use(express.static("../client/src/"));
const Coordinator = require("../model/coordinatorSchema");

router.post("/coordinator-reg", async (req, res) => {
  const { salutation, name, email, phone, password } = req.body;
  console.log(req.body);

  //checks if all the fields are filled or not
  if (!salutation || !name || !email || !phone || !password) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly" });
  }
  // console.log("Success");
  try {
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
      name,
      email,
      phone,
      password,
    });
    const coordinatorReg = await coordinator.save();
    if (coordinatorReg) {
      res.status(201).json({ message: "You are successfully registered!✌" });
    } else {
      res.status(500).json({ error: "Failed to register☹" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;