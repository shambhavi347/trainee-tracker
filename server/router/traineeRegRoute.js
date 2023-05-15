const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/database");
router.use(express.static("../client/src/"));
const student = require("../model/studentSchema");
const trainee = require("../model/traineeSchema");
const traineeAuthenticate = require("../middleware/traineeauth");
const Student = require("../model/studentSchema");
const Class = require("../model/classSchema");
const Coordinator = require("../model/coordinatorSchema");
const Trainee = require("../model/traineeSchema");
const Event = require("../model/eventsSchema");
const Project = require("../model/projectSchema");
const Group = require("../model/groupSchema");
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

    var emailRegex = /.+@..+\..[A-Za-z]+$/;
    // /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

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
    await Student.findOneAndUpdate(
      { email: email },
      { $set: { status: "registered" } }
    );
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
      const trainees = await Trainee.findOne({ _id: req.rootUser.id });
      // console.log(trainees);
      const isMatch = await bcrypt.compare(old_pass, trainees.password);
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
      const update = await Trainee.findOneAndUpdate(
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

// get student details
router.get("/student-data", traineeAuthenticate, async (req, res) => {
  try {
    const ID = req.rootUser.id;
    const Trainee = await trainee.findOne({ _id: ID });
    const stud = await student.findOne({ email: Trainee.email });
    if (stud) res.send(stud);
    // res.send(Trainee);
  } catch (error) {
    console.log(error);
  }
});

// update user details

router.post("/update", traineeAuthenticate, async (req, res) => {
  try {
    const { phone_no } = req.body;
    const ID = req.rootUser.id;
    const Trainee = await trainee.findOne({ _id: ID });
    if (!phone_no) {
      return res
        .status(422)
        .json({ error: "Your Phone no. is same as the previous one !!\n" });
    }

    const phoneRegex = /^[6-9]\d{9}$/gi;

    const phoneValid = phoneRegex.test(phone_no);

    if (!phoneValid) {
      return res
        .status(422)
        .json({ error: "Fill the Phone no. correctly !!\n" });
    }

    const userExist1 = await student.findOne({ phone_no: phone_no });
    if (userExist1) {
      return res.status(422).json({ error: "Phone no. already Exist" });
    }

    const stud = await student.findOneAndUpdate(
      { email: Trainee.email },
      { phone_no: phone_no }
    );
    if (stud) {
      res.status(201).json({ message: "Phone no. Updated" });
    } else {
      res.status(500).json({ error: "Failed to update Phone no." });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-trainee-Data", traineeAuthenticate, async (req, res) => {
  try {
    let Traineeid = [];
    const id = req.rootUser.id;
    const traineeData = await Trainee.findOne({ _id: id });
    const studData = await Student.findOne({ email: traineeData.email });
    const CoordData = await Class.findOne({ traineeID: studData._id });
    // console.log(CoordData);
    const TraineeData = await Class.find({
      coordinatorID: CoordData.coordinatorID,
    });
    TraineeData.map((val) => {
      Traineeid.push(val.traineeID);
    });
    const StudentData = await Student.find({ _id: { $in: Traineeid } });
    res.send(StudentData);
  } catch (error) {
    console.log(error);
  }
});
router.get("/get-Coordinator-Data", traineeAuthenticate, async (req, res) => {
  try {
    const id = req.rootUser._id;
    const stud_id = await Trainee.findOne({ _id: id });
    const studentDeets = await Student.findOne({ email: stud_id.email });
    const classes = await Class.findOne({ traineeID: studentDeets._id });
    const coord = await Coordinator.findOne({ _id: classes.coordinatorID });
    res.send(coord);
  } catch (error) {
    console.log(error);
  }
});

// router.get("/get-event-trainees", traineeAuthenticate, async (req, res) => {
//   try {
//     const ID = req.rootUser._id;
//     const train = await Trainee.findOne({ _id: ID });
//     const Stud = await Student.findOne({ email: train.email });
//     const classes = await Class.findOne({ traineeID: Stud._id });
//     const events = await Event.find({ coordinatorID: classes.coordinator_id });
//     console.log(events);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/get-event-trainees", traineeAuthenticate, (req, res) => {
  const ID = req.rootUser._id;
  Trainee.findOne({ _id: ID })
    .then((data) => {
      Student.findOne({ email: data.email })
        .then((data) => {
          Class.findOne({ traineeID: data._id })
            .then((data) => {
              Event.find({ coordinator_id: data.coordinatorID })
                .then((data) => res.send(data))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/project-list", traineeAuthenticate, async (req, res) => {
  try {
    // console.log("Hello get projects list");
    const id = req.rootUser._id;
    const stud_id = await Trainee.findOne({ _id: id });
    const studentDeets = await Student.findOne({ email: stud_id.email });
    const classes = await Class.findOne({ traineeID: studentDeets._id });
    // console.log(classes.coordinatorID);
    const pro = await Project.find({ coordinator_id: classes.coordinatorID });
    // console.log(pro);
    // if (pro)
    res.send(pro);
    // else res.status(200).json({ message: "None" });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/project-group", traineeAuthenticate, async (req, res) => {
//   try {
//     const id = req.rootUser._id;
//     const stud_id = await Trainee.findOne({ _id: id });
//     const studentDeets = await Student.findOne({ email: stud_id.email });
//     const classes = await Class.findOne({ traineeID: studentDeets._id });
//     // console.log(classes.coordinatorID);
//     const pro = await Group.find({
//       coordinatorID: classes.coordinatorID,
//     });
//     console.log(pro);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/project-group", traineeAuthenticate, (req, res) => {
  const ID = req.rootUser._id;
  Trainee.findOne({ _id: ID })
    .then((data) => {
      Student.findOne({ email: data.email })
        .then((data) => {
          Class.findOne({ traineeID: data._id })
            .then((data) => {
              Group.find({ coordinatorID: data.coordinatorID })
                .then((data) => res.send(data))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/project-own", traineeAuthenticate, (req, res) => {
  // console.log("Project Own");
  const id = req.rootUser._id;
  Trainee.findOne({ _id: id })
    .then((data) => {
      Student.findOne({ email: data.email })
        .then((data) => {
          // console.log(data.group);
          if (data.group !== "null") {
            Project.findOne({ group_id: data.group })
              .then((data) => {
                if (data) res.send(data);
                else res.send("no project");
              })
              .catch((err) => console.log(err));
          } else res.send("no project");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/group-own", traineeAuthenticate, async (req, res) => {
  try {
    const id = req.rootUser._id;
    const stud_id = await Trainee.findOne({ _id: id });
    const studentDeets = await Student.findOne({ email: stud_id.email });
    if (studentDeets.group === "null") res.send("No Group");
    else {
      const groups = await Group.findOne({ _id: studentDeets.group });
      res.send(groups);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/submit-file", traineeAuthenticate, async (req, res) => {
  try {
    const { fileID, fileName } = req.body;
    console.log(fileID + " " + fileName);
    const id = req.rootUser._id;
    const stud_id = await Trainee.findOne({ _id: id });
    const studentDeets = await Student.findOne({ email: stud_id.email });
    if (studentDeets.group === "null") res.send("No Group");
    const pro = await Project.findOne({ group_id: studentDeets.group });
    console.log(pro);
    const data = await Project.findOneAndUpdate(
      { _id: pro._id },
      {
        $push: {
          document: {
            fileID: fileID,
            fileName: fileName,
            remark: "",
          },
        },
      }
    );
    console.log(data);
    if (data) res.send("Success");
    else res.send("Fail");
  } catch (error) {
    console.log(error);
  }
});

router.post("/pull-file", traineeAuthenticate, async (req, res) => {
  try {
    const { fileId } = req.body;
    // console.log(fileI + " " + fileName);
    const id = req.rootUser._id;
    const stud_id = await Trainee.findOne({ _id: id });
    const studentDeets = await Student.findOne({ email: stud_id.email });
    if (studentDeets.group === "null") res.send("No Group");
    const pro = await Project.findOne({ group_id: studentDeets.group });
    console.log(pro);
    const data = await Project.findOneAndUpdate(
      { _id: pro._id },
      { $pull: { document: { fileID: fileId } } }
    );
    console.log(data);
    // console.log(data);
    // if (data) res.send("Success");
    // else res.send("Fail");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
