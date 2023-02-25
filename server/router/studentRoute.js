const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

require("../db/database");
router.use(express.static("../client/src/"));
const Student = require("../model/studentSchema");
const { default: isURL } = require("validator/lib/isURL");

router.post("/reg-stud", async (req, res) => {
  try {
    const {
      prefix,
      first_name,
      last_name,
      email,
      dob,
      phone_no,
      gender,
      course,
      stream,
      semester,
      cgpa,
      passout_year,
      famtech,
      inttech,
      status,
    } = req.body;

    console.log(req.body);
    //first validation - fileds not empty
    if (!prefix) {
      return res.status(422).json({ error: "Fill the salutation field !!\n" });
    }
    if (!first_name) {
      return res.status(422).json({ error: "Fill the First Name !!\n" });
    }
    if (!last_name) {
      return res.status(422).json({ error: "Fill the Last Name !!\n" });
    }
    if (!email) {
      return res.status(422).json({ error: "Fill the Email ID !!\n" });
    }
    if (!dob) {
      return res.status(422).json({ error: "Fill the Date of Birth !!\n" });
    }
    if (!phone_no) {
      return res.status(422).json({ error: "Fill the Phone no !!\n" });
    }
    if (!gender) {
      return res.status(422).json({ error: "Fill the Gender !!\n" });
    }
    if (!course) {
      return res.status(422).json({ error: "Fill the Course !!\n" });
    }
    if (!stream) {
      return res.status(422).json({ error: "Fill the Stream !!\n" });
    }
    if (!semester) {
      return res.status(422).json({ error: "Fill the Semester !!\n" });
    }
    if (!cgpa) {
      return res.status(422).json({ error: "Fill the CGPA !!\n" });
    }
    if (!passout_year) {
      return res.status(422).json({ error: "Fill the Passout Year !!\n" });
    }
    if (!famtech) {
      console.log("fam tech empty");
      return res
        .status(422)
        .json({ error: "Select atleast one Familiar Technology !!\n" });
    }
    if (!inttech) {
      return res
        .status(422)
        .json({ error: "Select atleast one Intrested Technology !!\n" });
    }

    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (email.length > 254) {
      return res
        .status(422)
        .json({ error: "Fill the Email ID correctly !!\n" });
    }

    var emailValid = emailRegex.test(email);
    if (!emailValid) {
      return res
        .status(422)
        .json({ error: "Fill the Email ID correctly !!\n" });
    }

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64) {
      return res
        .status(422)
        .json({ error: "Fill the Email ID correctly !!\n" });
    }

    var domainParts = parts[1].split(".");
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    ) {
      return res
        .status(422)
        .json({ error: "Fill the Email ID correctly !!\n" });
    }

    const phoneRegex = /^[6-9]\d{9}$/gi;

    const phoneValid = phoneRegex.test(phone_no);

    if (!phoneValid) {
      return res
        .status(422)
        .json({ error: "Fill the Phone no. correctly !!\n" });
    }

    console.log("success");

    const userExist = await Student.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email Id already Exist" });
    }

    const userExist1 = await Student.findOne({ phone_no: phone_no });
    if (userExist1) {
      return res.status(422).json({ error: "Phone no. already Exist" });
    }

    const user = new Student({
      prefix,
      first_name,
      last_name,
      email,
      dob,
      phone_no,
      gender,
      course,
      stream,
      semester,
      cgpa,
      passout_year,
      famtech,
      inttech,
      status,
    });

    await user.save();
    res.status(201).json({ message: "user registered successfully !!" });

    // const userRegister = await user.save();
    // if (userRegister) {
    //   res.status(201).json({ message: "user registered successfully !!" });
    // } else {
    //   res.status(422).json({ error: "failed to registered !!" });
    // }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
