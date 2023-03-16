const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const adminAuthenticate = require("../middleware/adminauth");
const nodemailer = require("nodemailer");

require("../db/database");
router.use(express.static("../client/src/"));
const Admin = require("../model/admin");
const Institute = require("../model/instituteSchema");
const Trainee = require("../model/traineeSchema");
const Student = require("../model/studentSchema");
const Invitation = require("../model/invitationSchema");
const Coordinator = require("../model/coordinatorSchema");

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
    const inst = await Student.find({ status: "pending" });
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-accept-student", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Student.find({ status: "accept" });
    res.send(inst);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-reject-student", adminAuthenticate, async (req, res) => {
  try {
    const inst = await Student.find({ status: "reject" });
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
      const cat = await Student.distinct("instname", { status: "pending" });
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
      const cat = await Student.distinct("instname", { status: "accept" });
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
      const cat = await Student.distinct("instname", { status: "reject" });
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
      const cat = await Student.distinct("stream", { status: "pending" });
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
      const cat = await Student.distinct("stream", { status: "accept" });
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
      const cat = await Student.distinct("stream", { status: "reject" });
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
      const cat = await Student.distinct("course", { status: "pending" });
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
      const cat = await Student.distinct("course", { status: "accept" });
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
      const cat = await Student.distinct("course", { status: "reject" });
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
      const cat = await Student.distinct("semester", { status: "pending" });
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
      const cat = await Student.distinct("semester", { status: "accept" });
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
      const cat = await Student.distinct("semester", { status: "reject" });
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
      const cat = await Student.distinct("passout_year", { status: "pending" });
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
      const cat = await Student.distinct("passout_year", { status: "accept" });
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
      const cat = await Student.distinct("passout_year", { status: "reject" });
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
      { $set: { status: "accept", invite: "pending" } }
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
//         { $set: { status: "accept" } }
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
      { $set: { status: "reject" } }
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
//         { $set: { status: "reject" } }
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
    const { salutation, first_name, last_name, email, date } = req.body;
    console.log(req.body);
    if (!salutation) {
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
      text: "Hello ${salutation} ${first_name} !! You have been selected as coordinator in our internship program. Kindly Register yourself Link : http://localhost:3000/reg-coordinator", // plain text body
      html: " <b>Hello ${salutation} ${first_name}  !! You have been selected as coordinator in our internship program. Kindly Register yourself Link : http://localhost:3000/reg-coordinator</b>", // html body
    });
    if (info.messageId) {
      const user = new Invitation({
        salutation,
        first_name,
        last_name,
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
    const isMatch = await bcrypt.compare(new_pass, admin.password);
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
    const stud = await Student.findOne({ email: email });
    const inst = await Institute.findOne({ email: email });
    const admin = await Admin.findOne({ email: email });
    const train = await Trainee.findOne({ email: email });
    let id;
    if (stud || inst || admin || train) {
      if (stud) id = stud._id;
      else if (inst) id = inst._id;
      else if (admin) id = admin._id;
      else id = train._id;
      console.log("ID" + id);
      let testAccount = await nodemailer.createTestAccount();
      let link = "http://localhost:3000/create-pass?a=${id}";
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
        text: "We got your request. You can now reset your password Link: http://localhost:3000/create-pass?a=${id} You can ignore this email.Keep your account extra safe", // plain text body
        html: " <b>We got your request.</b> You can now reset your password Link: ${link}  Didn’t ask for a new password? You can ignore this email.<b>Keep your account extra safe</b>", // html body
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

router.post("/create-password", async (req, res) => {
  try {
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    console.log("Hello" + paramString);
    for (let pair of queryString.entries()) {
      console.log("Key is: " + pair[0]);
      console.log("Value is: " + pair[1]);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/trainee-email", async (req, res) => {
  try {
    const traine = await Trainee.find({}, { _id: 0, email: 1 });
    console.log(traine);
    // res.send(traine.email);
    traine.map((val) => res.send(val.email));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
