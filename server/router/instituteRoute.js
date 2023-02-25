const express = require("express");
const router = express.Router();
require("../db/database");
router.use(express.static("../client/src/"));
const Institute = require("../model/instituteSchema");
const instituteAuthenticate = require("../middleware/instituteauth");

router.post("/institute-reg", async (req, res) => {
  const {
    name,
    email,
    month,
    duration,
    rating,
    rvalue,
    type,
    street,
    city,
    state,
    country,
    zipcode,
    phoneno,
    status,
    salutation,
    coordName,
    coordEmail,
    coordPhone,
    password,
  } = req.body;
  console.log(req.body);

  //checks if all the fields are filled or not
  if (
    !name ||
    !email ||
    !month ||
    !duration ||
    !rating ||
    !rvalue ||
    !type ||
    !street ||
    !city ||
    !state ||
    !country ||
    !zipcode ||
    !phoneno ||
    !status ||
    !salutation ||
    !coordName ||
    !coordEmail ||
    !coordPhone ||
    !password
  ) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly" });
  }
  // console.log("Success");
  try {
    //checks if its a new institute registration or not(email exist)
    const instituteExist = await Institute.findOne({ email: email });
    if (instituteExist) {
      return res.status(422).json({ error: "Institute already Exists" });
    }

    //checks if its a new coordinator registration or not(email exist)
    const coordinatorExist = await Institute.findOne({ email: coordEmail });
    if (coordinatorExist) {
      return res.status(422).json({ error: "Coordinator already Exists" });
    }

    //institute email format checking
    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (email.length > 254) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    var emailValid = emailRegex.test(email);
    if (!emailValid) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    //coordinator email format checking
    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (coordEmail.length > 254) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    var emailValid = emailRegex.test(coordEmail);
    if (!emailValid) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    //additional institute email validation
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

    //additional coordinator email validation
    var parts = coordEmail.split("@");
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

    //check institute phone format
    const phoneRegex = /^[6-9]\d{9}$/gi;
    const phoneValid = phoneRegex.test(phoneno);

    if (!phoneValid) {
      return res.status(422).json({ error: "Invalid Phone no.!!\n" });
    }

    //check coordinator phone format
    const regexPhone = /^[6-9]\d{9}$/gi;
    const validPhone = regexPhone.test(coordPhone);

    if (!validPhone) {
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
    const institute = new Institute({
      name,
      email,
      month,
      duration,
      rating,
      rvalue,
      type,
      street,
      city,
      state,
      country,
      zipcode,
      phoneno,
      status,
      salutation,
      coordName,
      coordEmail,
      coordPhone,
      password,
    });
    const instituteReg = await institute.save();
    if (instituteReg) {
      res.status(201).json({ message: "Institute successfully registered!✌" });
    } else {
      res.status(500).json({ error: "Failed to register☹" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/get-application-status",instituteAuthenticate,async (req ,res) =>{
  try {
  const id = req.rootUser._id;
  const inst = await Institute.find({_id:id});
  console.log(inst);  
  } catch (error) {
   console.log(error); 
  }
});

module.exports = router;
