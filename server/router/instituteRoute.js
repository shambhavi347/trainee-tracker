const express = require("express");
const router = express.Router();
require("../db/database");
router.use(express.static("../client/src/"));
const Institute = require("../model/instituteSchema");
const instituteAuthenticate = require("../middleware/instituteauth");
const Student = require("../model/studentSchema");

// Check validation on current page

router.post("/institute-reg0", async (req, res) => {
  const {
    name,
    email,
    smonth,
    emonth,
    duration,
    rating,
    rvalue,
    type,
    addressline1,
    addressline2,
    city,
    state,
    country,
    zipcode,
    landline,
    extension,
    phoneno,
  } = req.body;
  console.log(req.body);

  //checks if all the fields are filled or not
  if (!name) {
    return res
      .status(422)
      .json({ error: "Please fill the Name" });
  }
  if (!email) {
    return res
      .status(422)
      .json({ error: "Please fill the Email Id" });
  }
  if (!smonth) {
    return res
      .status(422)
      .json({ error: "Please fill the Start Month" });
  }
  if (!emonth) {
    return res
      .status(422)
      .json({ error: "Please fill the End Month" });
  }
  if (!duration) {
    return res
      .status(422)
      .json({ error: "Please fill the Duration" });
  }
  if (!rating) {
    return res
      .status(422)
      .json({ error: "Please fill the Institute Rating" });
  }
  if (!rvalue) {
    return res
      .status(422)
      .json({ error: "Please fill the Rated Value of your Institute" });
  }
  if (!type) {
    return res
      .status(422)
      .json({ error: "Please fill the Institute Type" });
  }
  if (!addressline1) {
    return res
      .status(422)
      .json({ error: "Please fill the Address" });
  }
  if (!city) {
    return res
      .status(422)
      .json({ error: "Please fill the City" });
  }
  if (!state) {
    return res
      .status(422)
      .json({ error: "Please fill the State" });
  }
  if (!country) {
    return res
      .status(422)
      .json({ error: "Please fill the Country" });
  }
  if (!zipcode) {
    return res
      .status(422)
      .json({ error: "Please fill the Zipcode" });
  }
  if (!landline) {
    return res
      .status(422)
      .json({ error: "Please fill the Landline no" });
  }
  // console.log("Success");
  try {
    //checks if its a new institute registration or not(email exist)
    const instituteExist = await Institute.findOne({ email: email });
    if (instituteExist) {
      return res.status(422).json({ error: "Institute Email Id already Exists" });
    }

    //institute email format checking
    var emailRegex = /.+@..+\..[A-Za-z]+$/;
    // /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (email.length > 254) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    var emailValid = emailRegex.test(email);
    if (!emailValid) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    // check Landline no format
    const regexLandline = /^[+][1-9]{2}[1-9]{3}[1-9]{3}[0-9]{4}$/
    const ValidLandline = regexLandline.test(landline);
    if (!ValidLandline) {
      return res.status(422).json({ error: "Invalid Landline no.!!\n" });
    }

    // check extension format
    if(extension) {
      const regexExtension = /^\d{1,4}$/
      const ValidExt = regexExtension.test(extension);
      if (!ValidExt) {
        return res.status(422).json({ error: "Invalid Extension Format!!\n" });
      }
    }

    // check Ext length

    if(extension.length === 4 || extension.length === 0) {

    }
    else {
      return res.status(422).json({ error: "Invalid Extension!!\n" });
    }
    
    //check institute phone format
    if(phoneno) {
      const regexPhone = /^[6-9]\d{9}$/gi;
      const validPhone = regexPhone.test(phoneno);

      if (!validPhone) {
        return res.status(422).json({ error: "Invalid Phone no.!!\n" });
      }
    }

  res.status(201).json({ message: "user registered successfully !!" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/institute-reg", async (req, res) => {
  const {
    name,
    email,
    smonth,
    emonth,
    duration,
    rating,
    rvalue,
    type,
    addressline1,
    addressline2,
    city,
    state,
    country,
    zipcode,
    landline,
    extension,
    phoneno,
    status,
    salutation,
    coordfirstName,
    coordmiddleName,
    coordlastName,
    coordEmail,
    coordPhone,
    password,
  } = req.body;
  console.log(req.body);

  //checks if all the fields are filled or not
  if (!name) {
    return res
      .status(422)
      .json({ error: "Please fill the Institute Name" });
  }
  if (!email) {
    return res
      .status(422)
      .json({ error: "Please fill the Email Id" });
  }
  if (!smonth) {
    return res
      .status(422)
      .json({ error: "Please fill the Internship Start Month" });
  }
  if (!emonth) {
    return res
      .status(422)
      .json({ error: "Please fill the Internship End Month" });
  }
  if (!duration) {
    return res
      .status(422)
      .json({ error: "Please fill the Internship Duration" });
  }
  if (!rating) {
    return res
      .status(422)
      .json({ error: "Please fill the Institute Rating" });
  }
  if (!rvalue) {
    return res
      .status(422)
      .json({ error: "Please fill the Rated Value of your Institute" });
  }
  if (!type) {
    return res
      .status(422)
      .json({ error: "Please fill the Institute Type" });
  }
  if (!addressline1) {
    return res
      .status(422)
      .json({ error: "Please fill the Institute Address" });
  }
  if (!city) {
    return res
      .status(422)
      .json({ error: "Please fill the City of Institute" });
  }
  if (!state) {
    return res
      .status(422)
      .json({ error: "Please fill the State of Institute" });
  }
  if (!country) {
    return res
      .status(422)
      .json({ error: "Please fill the Country of Institute" });
  }
  if (!zipcode) {
    return res
      .status(422)
      .json({ error: "Please fill the Zipcode of Institute" });
  }
  if (!landline) {
    return res
      .status(422)
      .json({ error: "Please fill the Landline no of Institute" });
  }
  if (!status) {
    return res
      .status(422)
      .json({ error: "Please fill the Status of Application" });
  }
  if (!salutation) {
    return res
      .status(422)
      .json({ error: "Please fill the Salutation" });
  }
  if (!coordfirstName) {
    return res
      .status(422)
      .json({ error: "Please fill the Coordinator's First Name" });
  }
  if (!coordlastName) {
    return res
      .status(422)
      .json({ error: "Please fill the Coordinator's Last Name" });
  }
  if (!coordEmail) {
    return res
      .status(422)
      .json({ error: "Please fill the Coordinator's Email Id" });
  }
  if (!coordPhone) {
    return res
      .status(422)
      .json({ error: "Please fill the Coordinator's phone no" });
  }
  if (!password) {
    return res
      .status(422)
      .json({ error: "Please fill the Password" });
  }
  // console.log("Success");
  try {

    // check landline no.
    // const regexLandline = /^[+][1-9]{2}[1-9]{3}[1-9]{3}[0-9]{4}$/
    // const ValidLandline = regexLandline.test(landline);
    // if (!ValidLandline) {
    //   return res.status(422).json({ error: "Invalid Landline no.!!\n" });
    // }

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
    var emailRegex = /.+@..+\..[A-Za-z]+$/;
    // /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (email.length > 254) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    var emailValid = emailRegex.test(email);
    if (!emailValid) {
      return res.status(422).json({ error: "Invalid Email ID format!!" });
    }

    //coordinator email format checking
    var emailRegex = /.+@..+\..[A-Za-z]+$/;
    // /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

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
    // const phoneRegex = /^\d{5,8}$/gi;
    // const phoneValid = phoneRegex.test(phoneno);

    // if (!phoneValid) {
    //   return res.status(422).json({ error: "Invalid Landline no.!!\n" });
    // }

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
          "Password must be of minimum 8 characters and should contain a digit, an uppercase alphabet,a lowercase alphabet and a special symbol!!",
      });
    }

    //confirmPassword
    // if (password !== confirmPassword) {
    //   res.status(400).json({ error: "Passwords do not match" });
    //   return;
    // }

    //if both key and value are same then you dont need to write name of both like name:name
    const institute = new Institute({
      name,
      email,
      smonth,
      emonth,
      duration,
      rating,
      rvalue,
      type,
      addressline1,
      addressline2,
      city,
      state,
      country,
      zipcode,
      landline,
      extension,
      phoneno,
      status,
      salutation,
      coordfirstName,
      coordmiddleName,
      coordlastName,
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

router.get(
  "/get-application-status",
  instituteAuthenticate,
  async (req, res) => {
    try {
      const id = req.rootUser._id;
      const inst = await Institute.find({ _id: id });
      res.send(inst[0].status);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-selected-students",
  instituteAuthenticate,
  async (req, res) => {
    try {
      // const {
      //   name, //sending name of institute to further match it with student's institute name
      // } = req.body;
      const inst = await Institute.findOne({ _id: req.rootUser._id });
      //console.log(inst.name);
      const stud = await Student.find({
        $and: [
          {
            instname: inst.name,
          },
          {
            status: "selection accept",
          },
        ],
        // instname: inst.name,
      });
      // console.log("student" + stud);
      // console.log("Name: " + stud[0].first_name + " " + stud[0].last_name);
      // console.log("DE NA OUTPUT");
      //checking if we are getting any results in stud or its empty
      if (stud) {
        res.send(stud);
      } else {
        res.send("No students");
      }
    } catch (error) {
      res.send(error);
    }
  }
);
//logout page
router.get("/logout", instituteAuthenticate, async (req, res) => {
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
  "/change-password-inst",
  instituteAuthenticate,
  async (req, res) => {
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
      const inst1 = await Institute.findOne({ _id: req.rootUser.id });
      const isMatch = await bcrypt.compare(old_pass, inst1.password);
      if (!isMatch)
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
      const new_pass_hash = await bcrypt.hash(new_pass, 12);
      //if both key and value are same then you dont need to write name of both like name:name
      const update = await Institute.findOneAndUpdate(
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
  }
);
module.exports = router;
