const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const adminAuthenticate = require("../middleware/adminauth");
const coordAuthenticate = require("../middleware/coordAuth");
const traineeAuthenticate = require("../middleware/traineeauth");
const nodemailer = require("nodemailer");

require("../db/database");
router.use(express.static("../client/src/"));
const Admin = require("../model/admin");
const Institute = require("../model/instituteSchema");
const Trainee = require("../model/traineeSchema");
const Student = require("../model/studentSchema");
const Invitation = require("../model/invitationSchema");
const Coordinator = require("../model/coordinatorSchema");
const Class = require("../model/classSchema");
const MessageSent = require("../model/MessageSentSchema");

//adminlogin
router.post("/admin-login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    // console.log(req.body);

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
    const coordLogin = await Coordinator.findOne({ email: email });

    if (adminLogin) {
      token = await adminLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      const isMatch = await bcrypt.compare(password, adminLogin.password);
      //third validation - password matching
      if (!isMatch) {
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
      const isMatch = await bcrypt.compare(password, instLogin.password);
      if (!isMatch) {
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
    } else if (coordLogin) {
      token = await coordLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      console.log(password);
      //third validation - password matching
      const isMatch = await bcrypt.compare(password, coordLogin.password);
      console.log(isMatch);
      if (!isMatch) {
        res.status(400).json({ error: "Incorrect Password" });
      } else {
        res.status(200).json({ message: "Coordinator" });
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

router.get("/get-accepted-institute", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Institute.find({ status: "accept" });
    // console.log("hi");
    // console.log(inst);
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-rejected-institute", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Institute.find({ status: "reject" });
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-pending-student", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Student.find({ status: "selection pending" });
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-accept-student", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Student.find({
      $or: [
        { status: "selection accept" },
        { status: "mail sent" },
        { status: "mail not sent" },
        { status: "registered" },
        { status: "assigned" },
      ],
    });
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-reject-student", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Student.find({ status: "selection reject" });
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});

router.get(
  "/get-type-pending-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Institute.distinct("type", { status: "pending" });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/get-type-accept-category", adminAuthenticate, async (req, res) => {
  try {
    const cat = await Institute.distinct("type", { status: "accept" });
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-type-reject-category", adminAuthenticate, async (req, res) => {
  try {
    const cat = await Institute.distinct("type", { status: "reject" });
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

router.get(
  "/get-duration-pending-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Institute.distinct("duration", { status: "pending" });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-duration-accept-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Institute.distinct("duration", { status: "accept" });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-duration-reject-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Institute.distinct("duration", { status: "reject" });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-naac-pending-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Institute.distinct("rating", { status: "pending" });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/get-naac-accept-category", adminAuthenticate, async (req, res) => {
  try {
    const cat = await Institute.distinct("rating", { status: "accept" });
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-naac-reject-category", adminAuthenticate, async (req, res) => {
  try {
    const cat = await Institute.distinct("rating", { status: "reject" });
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

router.get(
  "/get-month-pending-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Institute.distinct("month", { status: "pending" });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-month-accept-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Institute.distinct("month", { status: "accept" });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-month-reject-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Institute.distinct("month", { status: "reject" });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-instname-pending-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("instname", {
        status: "selection pending",
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-instname-accept-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("instname", {
        $or: [
          { status: "selection accept" },
          { status: "mail sent" },
          { status: "mail not sent" },
          { status: "registered" },
          { status: "assigned" },
        ],
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-instname-reject-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("instname", {
        status: "selection reject",
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-stream-pending-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("stream", {
        status: "selection pending",
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-stream-accept-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("stream", {
        $or: [
          { status: "selection accept" },
          { status: "mail sent" },
          { status: "mail not sent" },
          { status: "registered" },
          { status: "assigned" },
        ],
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-stream-reject-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("stream", {
        status: "selection reject",
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-course-pending-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("course", {
        status: "selection pending",
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-course-accept-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("course", {
        $or: [
          { status: "selection accept" },
          { status: "mail sent" },
          { status: "mail not sent" },
          { status: "registered" },
          { status: "assigned" },
        ],
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-course-reject-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("course", {
        status: "selection reject",
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-semester-pending-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("semester", {
        status: "selection pending",
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-semester-accept-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("semester", {
        $or: [
          { status: "selection accept" },
          { status: "mail sent" },
          { status: "mail not sent" },
          { status: "registered" },
          { status: "assigned" },
        ],
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-semester-reject-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("semester", {
        status: "selection reject",
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-passout-year-pending-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("passout_year", {
        status: "selection pending",
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-passout-year-accept-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("passout_year", {
        $or: [
          { status: "selection accept" },
          { status: "mail sent" },
          { status: "mail not sent" },
          { status: "registered" },
          { status: "assigned" },
        ],
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/get-passout-year-reject-category",
  adminAuthenticate,
  async (req, res) => {
    try {
      const cat = await Student.distinct("passout_year", {
        status: "selection reject",
      });
      res.send(cat);
    } catch (error) {
      console.log(error);
    }
  }
);

router.post("/accept-inst", adminAuthenticate, async (req, res) => {
  try {
    const { email } = req.body;
    await Institute.findOneAndUpdate(
      { email: email },
      { $set: { status: "accept" } }
    );
    res.send("Insititue Accepted");
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
    res.send("Insititue Rejected");
  } catch (error) {
    console.log(error);
  }
});

//send mail to accept student
router.post("/accept-student", adminAuthenticate, async (req, res) => {
  try {
    const { email } = req.body;
    await Student.findOneAndUpdate(
      { email: email },
      { $set: { status: "mail sent" } }
    );
    res.send("Student Accepted");
  } catch (error) {
    console.log(error);
  }
});

// router.post("/send-student-mail", adminAuthenticate, async (req, res) => {
//   try {
//     const { email } = req.body;
//     URL = "http://localhost:3000/trainee-reg";

//     console.log(email);
//     let testAccount = await nodemailer.createTestAccount();

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: "randy67@ethereal.email", // generated ethereal user
//         pass: "jgUkDR2nsSUKFHKG1e", // generated ethereal password
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"CDAC Trainee Tracker" <shambhavishanker1999@gmail.com>', // sender address
//       to: email, // list of receivers
//       subject: "CDAC Student Application Result", // Subject line
//       text: "Hello from trainee tracker!! The interested student must register on the below link copy paste it in your browser  Link: http://localhost:3000/trainee-reg", // plain text body
//       html: " <b>Hello from trainee tracker</b> <a href= ${URl} > Register </a> <br/> Copy Paste the below URL :- http://localhost:3000/trainee-reg", // html body
//     });
//     if (info.messageId) {
//       await Student.findOneAndUpdate(
//         { email: email },
//         { $set: { status: "mail sent" } }
//       );
//       res.send("Mail Sent");
//     } else {
//       res.send("Mail Not Sent");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

//reject Student
router.post("/reject-student", adminAuthenticate, async (req, res) => {
  try {
    const { email } = req.body;
    await Student.findOneAndUpdate(
      { email: email },
      { $set: { status: "selection reject" } }
    );
    res.send("Student Rejected");
  } catch (error) {
    console.log(error);
  }
});
// router.post("/reject-student", adminAuthenticate, async (req, res) => {
//   try {
//     const { email } = req.body;

//     console.log(email);
//     let testAccount = await nodemailer.createTestAccount();

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: "randy67@ethereal.email", // generated ethereal user
//         pass: "jgUkDR2nsSUKFHKG1e", // generated ethereal password
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"CDAC Trainee Tracker" <shambhavishanker1999@gmail.com>', // sender address
//       to: email, // list of receivers
//       subject: "CDAC Student Application Result", // Subject line
//       text: "Hello from trainee tracker!! Thank You for applying but we are not moving forward with your application", // plain text body
//       html: " <b>Hello from trainee tracker!! Thank You for applying but we are not moving forward with your application </b>", // html body
//     });
//     if (info.messageId) {
//       await Student.findOneAndUpdate(
//         { email: email },
//         { $set: { status: "mail not sent" } }
//       );
//       res.send("Mail Sent");
//     } else {
//       res.send("Mail Not Sent");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

//coord Invitation
router.post("/reg-coord", adminAuthenticate, async (req, res) => {
  try {
    const { salutation, first_name, middle_name, last_name, email, date } =
      req.body;
    console.log(req.body);
    if (!salutation) {
      return res.status(422).json({ error: "Fill the salutation field !!\n" });
    }
    if (!first_name) {
      return res.status(422).json({ error: "Fill the First Name !!\n" });
    }
    // if (!middle_name) {
    //   return res.status(422).json({ error: "Fill the Middle Name !!\n" });
    // }
    if (!last_name) {
      return res.status(422).json({ error: "Fill the Last Name !!\n" });
    }
    if (!email) {
      return res.status(422).json({ error: "Fill the Email ID !!\n" });
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
    const userExist = await Invitation.findOne({ email: email });
    if (userExist) {
      return res
        .status(422)
        .json({ error: "Inivation has already been sent to this user" });
    }

    const coordExist = await Coordinator.findOne({ email: email });
    if (coordExist) {
      return res
        .status(422)
        .json({ error: "This user is already a coordinator" });
    }

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
      subject: "CDAC Coordinator Registration", // Subject line
      text: `Hello ${salutation} ${first_name} !! You have been selected as coordinator in our internship program. Kindly Register yourself Link : http://localhost:3000/reg-coord`, // plain text body
      html: ` <b>Hello ${salutation} ${first_name}  !! You have been selected as coord in our internship program. Kindly Register yourself Link : http://localhost:3000/reg-coord</b>`, // html body
    });
    if (info.messageId) {
      const user = new Invitation({
        salutation,
        first_name,
        last_name,
        middle_name,
        email,
        date,
      });
      await user.save();
      res.status(201).json({ message: "Mail sent Successfully!!" });
      // res.send("Mail Sent");
    } else {
      res.status(422).json({ message: "Mail sent Successfully!!" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-invitation", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Invitation.find({});
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-coordinators", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Coordinator.find({});
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});

router.post("/revoke-invitation", adminAuthenticate, async (req, res) => {
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
      subject: "CDAC Coordinator Invite Revoke", // Subject line
      text: "Hello from trainee tracker!! We are revoking your coordinator invitaion", // plain text body
      html: " <b>Hello from trainee tracker!! We are revoking your coordinator invitaion </b>", // html body
    });
    if (info.messageId) {
      await Invitation.findOneAndDelete({ email: email });

      res.send("Mail Sent");
    } else {
      res.send("Mail Not Sent");
    }
  } catch (error) {
    console.log(error);
  }
});

//logout page
router.get("/logout", adminAuthenticate, async (req, res) => {
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
router.post("/change-password", adminAuthenticate, async (req, res) => {
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
    const admin = await Admin.findOne({});
    const isMatch = await bcrypt.compare(old_pass, admin.password);
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
    const update = await Admin.findOneAndUpdate(
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

//forgot password mail
router.post("/forgot-pass", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(422).json({ error: "Email ID field is empty\n" });
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
    const coord = await Coordinator.findOne({ email: email });
    const inst = await Institute.findOne({ email: email });
    const admin = await Admin.findOne({ email: email });
    const train = await Trainee.findOne({ email: email });
    let id;
    if (coord || inst || admin || train) {
      if (coord) id = coord._id;
      else if (inst) id = inst._id;
      else if (train) id = train._id;
      // else if (admin) id = admin._id;
      else id = admin._id;
      // console.log("ID" + id);
      let testAccount = await nodemailer.createTestAccount();
      let link = "http://localhost:3000/create-password/" + id;
      // console.log(link);
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
        subject: "Reset your password on Trainee Tracker", // Subject line
        text: `We got your request. You can now reset your password Link: ${link} You can ignore this email.Keep your account extra safe`, // plain text body
        html: `<b>We got your request.</b> You can now reset your password Link: ${link}  Didn’t ask for a new password? You can ignore this email.<b>Keep your account extra safe</b>`, // html body
      });
      if (info.messageId) {
        console.log("mail sent");
        return res.status(200).json({ message: "Mail is sent  !!\n" });
      } else {
        return res.status(422).json({ error: "Mail is not sent  !!\n" });
      }
    } else
      return res
        .status(422)
        .json({ error: "This email id is not registered  !!\n" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/create-pass", async (req, res) => {
  try {
    const { userId, password } = req.body;
    console.log(userId);
    const admin = await Admin.findOne({ _id: userId });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch)
        return res
          .status(422)
          .json({ error: "Do not use Old Password! Create a new one" });
      const new_pass_hash = await bcrypt.hash(password, 12);
      const update = await Admin.findOneAndUpdate(
        { _id: userId },
        { password: new_pass_hash }
      );
      if (update) {
        res.status(201).json({ message: "Password Updated" });
      } else {
        res.status(422).json({ error: "Failed to update" });
      }
    } else {
      const trainee = await Trainee.findOne({ _id: userId });
      if (trainee) {
        const isMatch = await bcrypt.compare(password, trainee.password);
        if (isMatch)
          return res
            .status(422)
            .json({ error: "Do not use Old Password! Create a new one" });
        const new_pass_hash = await bcrypt.hash(password, 12);
        const update = await Trainee.findOneAndUpdate(
          { _id: userId },
          { password: new_pass_hash }
        );
        if (update) {
          res.status(201).json({ message: "Password Updated" });
        } else {
          res.status(422).json({ error: "Failed to update" });
        }
      } else {
        console.log("coordinator");
        const coord = await Coordinator.findOne({ _id: userId });
        if (coord) {
          const isMatch = await bcrypt.compare(password, coord.password);
          console.log(isMatch);
          if (isMatch) {
            return res
              .status(422)
              .json({ error: "Do not use Old Password! Create a new one" });
          }
          const new_pass_hash = await bcrypt.hash(password, 12);
          const update = await Coordinator.findOneAndUpdate(
            { _id: userId },
            { password: new_pass_hash }
          );
          if (update) {
            res.status(201).json({ message: "Password Updated" });
          } else {
            res.status(422).json({ error: "Failed to update" });
          }
        } else {
          const Inst = await Institute.findOne({ _id: userId });
          if (Inst) {
            const isMatch = await bcrypt.compare(password, Inst.password);
            if (isMatch)
              return res
                .status(422)
                .json({ error: "Do not use Old Password! Create a new one" });
            const new_pass_hash = await bcrypt.hash(password, 12);
            const update = await Institute.findOneAndUpdate(
              { _id: userId },
              { password: new_pass_hash }
            );
            if (update) {
              res.status(201).json({ message: "Password Updated" });
            } else {
              res.status(422).json({ error: "Failed to update" });
            }
          } else {
            res.status(422).json({ error: "Unauthorised Access" });
          }
        }
      }
    }

    // const isMatch = await bcrypt.compare(new_pass, admin.password);
    // if (!isMatch) return res.status(422).json({ error: "Password Incorrect" });

    // const new_pass_hash = await bcrypt.hash(new_pass, 12);
    //if both key and value are same then you dont need to write name of both like name:name
    // const update = await Admin.findOneAndUpdate(
    //   { _id: req.rootUser.id },
    //   { password: new_pass_hash }
    // );

    // if (update) {
    //   res.status(201).json({ message: "Password Updated" });
    // } else {
    //   res.status(422).json({ error: "Failed to update" });
    // }

    // console.log("hello change password" + userId + password);
  } catch (error) {
    console.log(error);
  }
});

router.get("/trainee-email", async (req, res) => {
  try {
    const traine = await Trainee.find({}, { _id: 0, email: 1 });
    // res.send(traine.email);
    traine.map((val) => res.send(val.email));
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-trainee", async (req, res) => {
  try {
    const class_trainee = [];
    const class_stud = await Class.find({});
    const trainees = await Student.find({ status: "registered" });
    class_stud.map((val) => class_trainee.push(val.traineeID));
    var filteredArray = trainees.filter(function (array_el) {
      return (
        class_trainee.filter(function (anotherOne_el) {
          return anotherOne_el == array_el._id;
        }).length == 0
      );
    });
    res.send(filteredArray);
  } catch (error) {
    console.log(error);
  }
});

router.post("/get-class-coordinator", (req, res) => {
  const { coordId } = req.body;
  let trainee_id = [];
  Class.find({ coordinatorID: coordId })
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

router.post("/remove-trainee-class", async (req, res) => {
  try {
    const { trainee_id } = req.body;
    await Student.findOneAndUpdate(
      { _id: trainee_id },
      { $set: { status: "registered" } }
    );
    await Class.findOneAndDelete({ traineeID: trainee_id });
    res.send("deleted");
  } catch (error) {
    console.log(error);
  }
});

// router.post("/create-class", (req, res) => {
//   try {
//     const { trainees, coord_id } = req.body;
//     trainees.map((val) => {
//       const classes = new Class({
//         coord_id,
//         val,
//       });
//       const clas = classes.save();
//       if (clas) console.log("saved Successfully");
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/create-class", (req, res) => {
  // try {
  const { trainees, coord_id } = req.body;
  trainees.map((val) => {
    let coordinatorID = coord_id;
    let traineeID = val;
    console.log("coord: " + coordinatorID + " Trainee: " + traineeID);
    const classes = new Class({
      coordinatorID,
      traineeID,
    });
    classes
      .save()
      .then((data) => {
        Student.findOneAndUpdate(
          { _id: traineeID },
          { $set: { status: "assigned" } }
        )
          .then((data) => console.log("saved"))
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
  });
  // } catch (error) {
  //   console.log(error);
  // }
});

router.get("/get-sem-class", adminAuthenticate, async (req, res) => {
  try {
    const cat = await Student.distinct("semester", {
      status: "registered",
    });
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-inst-name-class", adminAuthenticate, async (req, res) => {
  try {
    const cat = await Student.distinct("instname", {
      status: "registered",
    });
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-course-class", adminAuthenticate, async (req, res) => {
  try {
    const cat = await Student.distinct("course", {
      status: "registered",
    });
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-stream-class", adminAuthenticate, async (req, res) => {
  try {
    const cat = await Student.distinct("stream", {
      status: "registered",
    });
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-passout-year-class", adminAuthenticate, async (req, res) => {
  try {
    const cat = await Student.distinct("passout_year", {
      status: "registered",
    });
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

// send coordinator message to database

router.post("/send_message", coordAuthenticate, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(422).json({ error: "Write Something to Post" });
    }
    const trainee_list = [];
    const ID = req.rootUser.id;
    const c = await Coordinator.findOne({ _id: ID });
    console.log(c.first_name);
    const Coord = await Class.find({ coordinatorID: ID });
    console.log(Coord[0].coordinatorID);
    Coord.map((val) => trainee_list.push(val.traineeID));
    console.log("trainee list");
    console.log(trainee_list);
    console.log("coord id");
    console.log(Coord[0].coordinatorID);
    console.log("message");
    console.log(message);
    let name = c.first_name;
    if(c.middle_name)
    {
      name = name.concat(" " + c.middle_name);
    }
    if(c.last_name)
    {
      name = name.concat(" " + c.last_name);
    }
    const NewMsg = new MessageSent({
      message,
      coord_id: Coord[0].coordinatorID,
      sender_name: name,
      trainee_list_id: trainee_list,
    });
    const savedMessage = await NewMsg.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.log(error);
  }
});

// get messages from MessageSent collection to coordinator

router.get("/messages", coordAuthenticate, async (req, res) => {
  const ID = req.rootUser.id;
  const Coordi = await Class.find({ coordinatorID: ID });
  // console.log("coordinator " + Coordi);
  const coord = Coordi[0].coordinatorID;
  const msgs = await MessageSent.find({ coord_id: coord });
  Coordi.map((val) => {
    let trainee = val.traineeID;
    console.log("trainee " + trainee);
    MessageSent.find({ trainee_list_id: trainee })
      .then((data) => {
        const m = [];
        data.map((d) => {
          m.push(d.message);
        });
        if (!res.headersSent) {
          if (m) {
            console.log("Messages - " + m);
            res.send(m);
            return;
          }
        }
      })
      .catch((error) => {
        if (!res.headersSent) {
          console.log(error);
        }
      });
  });
});

// get names from MessageSent collection to coordinator

router.get("/names", coordAuthenticate, async (req, res) => {
  const ID = req.rootUser.id;
  const Coordi = await Class.find({ coordinatorID: ID });
  // console.log("coordinator " + Coordi);
  const coord = Coordi[0].coordinatorID;
  const msgs = await MessageSent.find({ coord_id: coord });
  Coordi.map((val) => {
    let trainee = val.traineeID;
    console.log("trainee " + trainee);
    MessageSent.find({ trainee_list_id: trainee })
      .then((data) => {
        const m = [];
        data.map((d) => {
          m.push(d.sender_name);
        });
        if (!res.headersSent) {
          if (m) {
            console.log("Names - " + m);
            res.send(m);
            return;
          }
        }
      })
      .catch((error) => {
        if (!res.headersSent) {
          console.log(error);
        }
      });
  });
});

// send trainee message to database

router.post("/send_message1", traineeAuthenticate, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(422).json({ error: "Write Something to Post" });
    }
    const receiverId = []; //direct isse store karayenge class mein
    //aur jitne logo ko msg receive hoga unki id isme push karte rahenge

    const id = req.rootUser.id; // trainee OBJECTID;
    console.log("trainee id - " + id);
    const traine = await Trainee.findOne({ _id: id }); // use this to get trainee email
    const stud = await Student.findOne({ email: traine.email }); // use this to get student OBJECT ID
    console.log("student id - " + stud._id);
    const cla = await Class.findOne({ traineeID: stud._id }); //use this to get coordinator Id
    console.log("class " + cla);
    receiverId.push(cla.coordinatorID); // kyunki coordinator ko bhi msg bhejna hai
    //toh coordinator Id bhi receiver Id mein store hogi

    //ab class ke baaki saare students ki id nikalenge
    const coll = await Class.find({ coordinatorID: cla.coordinatorID });
    coll.map((val) => {
      return receiverId.push(val.traineeID);
      // jitne bhi saathe ke trainee hai unki id push ho jaayegi isme
    });
    //receiverId array mein ab saare logo ki id save ho jaani chahiye jinko bhi msg bhejna hai

    // const filtered = receiverId.filter(obj => {
    //   console.log("ele - " + obj + " & stud - " + stud._id);
    //   return obj !== stud._id;
    // });
    let name = stud.first_name;
    if(stud.middle_name)
    {
      name = name.concat(" " + stud.middle_name);
    }
    if(stud.last_name)
    {
      name = name.concat(" " + stud.last_name);
    }
    console.log("sender id => " + stud._id);
    console.log("rcvr id => " + receiverId);
    console.log("message => " + message);

    const NewMsg = new MessageSent({
      message,
      coord_id: stud._id,
      sender_name: name,
      name: stud.first_name,
      trainee_list_id: receiverId,
    });
    const savedMessage = await NewMsg.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.log(error);
  }
});

// get all messages from MessageSent schema to trainee dashboard

router.get("/messages_trainee", traineeAuthenticate, async (req, res) => {
  const id = req.rootUser.id;
  console.log("trainee id - " + id);
  const traine = await Trainee.findOne({ _id: id });
  const stud = await Student.findOne({ email: traine.email });
  console.log("student id - " + stud._id);
  const cla = await Class.findOne({ traineeID: stud._id });
  const coord = cla.coordinatorID;

  const Coordi = await Class.find({ coordinatorID: coord });
  // console.log("coordinator " + Coordi);

  const msgs = await MessageSent.find({ coord_id: coord });

  // msgs.map((val) => ms.push(val.message));
  // console.log("Messages - " + m);
  Coordi.map((val) => {
    let trainee = val.traineeID;
    console.log("trainee " + trainee);
    MessageSent.find({ trainee_list_id: trainee })
      .then((data) => {
        const m = [];
        data.map((d) => {
          m.push(d.message);
        });
        if (!res.headersSent) {
          if (m) {
            console.log("Messages - " + m);
            res.send(m);
            return;
          }
        }
      })
      .catch((error) => {
        if (!res.headersSent) {
          console.log(error);
        }
      });
  });
  
});

// get all names from MessageSent schema to trainee dashboard

router.get("/names1", traineeAuthenticate, async (req, res) => {
  const id = req.rootUser.id;
  console.log("trainee id - " + id);
  const traine = await Trainee.findOne({ _id: id });
  const stud = await Student.findOne({ email: traine.email });
  console.log("student id - " + stud._id);
  const cla = await Class.findOne({ traineeID: stud._id });
  const coord = cla.coordinatorID;

  const Coordi = await Class.find({ coordinatorID: coord });
  // console.log("coordinator " + Coordi);

  const msgs = await MessageSent.find({ coord_id: coord });

  // msgs.map((val) => ms.push(val.message));
  // console.log("Messages - " + m);
  Coordi.map((val) => {
    let trainee = val.traineeID;
    console.log("trainee " + trainee);
    MessageSent.find({ trainee_list_id: trainee })
      .then((data) => {
        const m = [];
        data.map((d) => {
          m.push(d.sender_name);
        });
        if (!res.headersSent) {
          if (m) {
            console.log("Names - " + m);
            res.send(m);
            return;
          }
        }
      })
      .catch((error) => {
        if (!res.headersSent) {
          console.log(error);
        }
      });
  });
});

module.exports = router;
