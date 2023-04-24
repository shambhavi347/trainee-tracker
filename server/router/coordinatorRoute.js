const express = require("express");
const router = express.Router();
require("../db/database");
router.use(express.static("../client/src/"));
const Coordinator = require("../model/coordinatorSchema");
// const Invitation = require("../model/invitationSchema");
const coordAuthenticate = require("../middleware/coordAuth");
const Class = require("../model/classSchema");
const Student = require("../model/studentSchema");
const Group = require("../model/groupSchema");
// const { response } = require("express");
// const { request } = require("express");
const Event = require("../model/eventsSchema");
const Project = require("../model/projectSchema");
const Archive = require("../model/archiveSchema");
// const archival = require("../model/archivalSchema");
// const Archival = require("../model/archivalSchema");

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
    if (!salutation) {
      return res.status(422).json({ error: "Please fill Salutation" });
    }
    if (!first_name) {
      return res.status(422).json({ error: "Please fill the First Name" });
    }
    // if (!last_name) {
    //   return res
    //     .status(422)
    //     .json({ error: "Please fill the Last Name" });
    // }
    if (!email) {
      return res.status(422).json({ error: "Please fill the Email Id" });
    }
    if (!phone) {
      return res.status(422).json({ error: "Please fill the Phone No." });
    }
    if (!password) {
      return res.status(422).json({ error: "Please fill the Password" });
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
    const coord1 = await Coordinator.findOne({ _id: req.rootUser.id });
    const isMatch = await bcrypt.compare(old_pass, coord1.password);
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

router.post("/create-event", coordAuthenticate, async (req, res) => {
  try {
    const { event_name, deadline } = req.body;
    const id = req.rootUser._id;
    // console.log(event_name);
    // console.log(deadline);
    // console.log(id);
    const eve = new Event({
      title: event_name,
      timestamp: deadline,
      coordinator_id: id,
    });
    const new_event = await eve.save();
    // console.log(new_event);
    if (new_event) {
      // console.log("Added");

      res.status(200).json({ message: "Added" });
      // res.send("Added");
    } else {
      // console.log("Not Added");
      res.status(422).json({ error: "Failed to add" });
      // res.send(" Not Added");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete-event", coordAuthenticate, async (req, res) => {
  try {
    const { eventID } = req.body;
    // console.log(eventID);
    const data = await Event.findOneAndDelete({ _id: eventID });
    if (data) res.status(200).json({ message: "Deleted" });
    else res.status(422).json({ error: "Failed to delete" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-events", coordAuthenticate, async (req, res) => {
  try {
    const id = req.rootUser._id;
    // console.log(id);
    const events = await Event.find({ coordinator_id: id });
    res.send(events);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-project", coordAuthenticate, async (req, res) => {
  const { title, description } = req.body;
  const id = req.rootUser._id;
  const pro = new Project({
    title,
    description,
    coordinator_id: id,
    group_id: "null",
  });
  const new_pro = await pro.save();
  if (new_pro) {
    res.status(200).json({ message: "Saved" });
  } else {
    res.status(422).json({ error: "Failed to add Project" });
  }
});

router.get("/get-projects", coordAuthenticate, async (req, res) => {
  try {
    const id = req.rootUser._id;
    // console.log(id);
    const projects = await Project.find({ coordinator_id: id });
    // console.log(projects);
    res.send(projects);
  } catch (error) {
    console.log(error);
  }
});

router.post("/assign-project", coordAuthenticate, async (req, res) => {
  try {
    const { name, title } = req.body;
    const ID = req.rootUser._id;
    console.log(name + " " + title);
    const groupID = await Group.findOne({
      $and: [{ coordinatorID: ID }, { name: name }],
    });
    // console.log(groupID);
    const data = await Project.findOneAndUpdate(
      { $and: [{ coordinator_id: ID }, { title: title }] },
      { $set: { group_id: groupID._id } }
    );
    if (data) {
      res.status(200).json({ message: "Saved" });
    } else {
      res.status(422).json({ error: "Failed to add Project" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-groups-assign", coordAuthenticate, async (req, res) => {
  try {
    const ID = req.rootUser.id;
    // const groupID = await Group.distinct("_id", { coordinatorID: ID });
    // console.log(groupID);
    const groupAssignID = await Project.distinct("group_id", {
      coordinator_id: ID,
    });

    const newGroupAssign = groupAssignID.filter((val) => {
      return val !== "null";
    });
    // console.log(newGroupAssign);
    res.send(newGroupAssign);
    // const newGroupID = groupID.filter((item) => !newGroupAssign.includes(item));
    // console.log(newGroupID);
  } catch (error) {
    console.log(error);
  }
});

//create-group {DO NOT TOUCH!!}
const handleStudent = (id, members) => {
  members.map((val) => {
    Student.findOneAndUpdate({ _id: val }, { $set: { group: id } })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  });
};
router.post("/create-group", coordAuthenticate, async (req, res) => {
  const coordID = req.rootUser.id;
  const { name, members } = req.body;

  const mem = await Student.find({ _id: { $in: members } });
  // console.log(mem);

  const group = new Group({
    name: name,
    coordinatorID: coordID,
    members: mem,
  });
  group.save(function (err, result) {
    if (err) {
      return res.status(422).json({ error: "Unable to save" });
    } else {
      console.log("saved");
      handleStudent(result._id, members);
      return res.status(200).json({ message: "saved" });
      // console.log("Result: " + res);
    }
  });
});

router.get("/get-groups", coordAuthenticate, async (req, res) => {
  try {
    const id = req.rootUser.id;
    // console.log(id);
    const data = await Group.find({ coordinatorID: id });
    // console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/remove-group", coordAuthenticate, (req, res) => {
  const { groupId, studID } = req.body;
  // const data = await Group.findOneAndDelete({ _id: id });
  // console.log(groupId);
  // console.log(studID);
  Group.findOneAndDelete({ _id: groupId })
    .then((data) => {
      studID.map((val) => {
        Student.findOneAndUpdate({ _id: val }, { $set: { group: "null" } })
          .then((data) => {
            return res.status(200).json({ message: "saved" });
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
  // // console.log(data);
  // res.send(data);
});

router.post("/send-remark", coordAuthenticate, async (req, res) => {
  try {
    const { remark, fileID, projectId } = req.body;
    console.log(remark + " " + fileID + " " + projectId);
    const pro = await Project.findOneAndUpdate(
      {
        _id: projectId,
        "document.fileID": fileID,
      },
      {
        $set: {
          "document.$.remark": remark,
        },
      }
    );
    if (pro) res.send("Success");
    // update(
    //   { 'items': { '$elemMatch': { 'itemName': 'Name 1' }}},
    //   { '$set': { 'items.$[item].itemName': 'New Name' }},
    //   { 'arrayFilter': [{ 'item.itemName': 'Name 1' }], 'multi': true }
    // )
    // console.log(pro);
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete-pro-assign", coordAuthenticate, (req, res) => {
  const { projectId } = req.body;
  const ID = req.rootUser._id;

  Project.findOne({ _id: projectId })
    .then((val) => {
      if (val.document.length > 0) {
        const user = new Archive({
          coordintor_id: ID,
          project_name: val.title,
          document: val.document,
        });
        user
          .save()
          .then((data) => {
            // len = val.document.length;
            val.document?.map((value) => {
              Project.findOneAndUpdate(
                { _id: projectId },
                { $pull: { document: { fileID: value.fileId } } }
              )
                .then((data) => {
                  console.log("Pulled");
                  // count = count + 1;
                })
                .catch((err) => console.log(err));
            });

            Project.findOneAndUpdate(
              { _id: projectId },
              { $set: { group_id: "null" } }
            )
              .then((data) => res.send("Updated"))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        Project.findOneAndUpdate(
          { _id: projectId },
          { $set: { group_id: "null" } }
        )
          .then((data) => res.send("Updated"))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

router.post("/delete-pro", coordAuthenticate, async (req, res) => {
  try {
    const { projectId } = req.body;
    console.log(projectId);
    const data = await Project.findOneAndDelete({ _id: projectId });
    if (data) res.send("Deleted");
    else res.send("Failed");
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-archives", coordAuthenticate, async (req, res) => {
  try {
    const id = req.rootUser.id;
    // console.log(id);
    const data = await Archive.find({ coordintor_id: id });
    // console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
