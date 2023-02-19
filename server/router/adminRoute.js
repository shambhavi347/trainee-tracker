const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/adminauth");

require("../db/database");
router.use(express.static("../client/src/"));
const Admin = require("../dbmodel/admin");
const { json } = require("express");

router.get("/admin-dashboard", (req, res) => {
  // var adminID = req.rootUser._id;
  // Admin.find({ _id: adminID })
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  console.log("Hello dash board");
  // res.send("hello Dashboard");
});

//login

// router.post("/admin-login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body);
//     //reg

//     //first validation : fileds not empty
//     if (!email || !password) {
//       return res.status(422).json({ error: "fill the form correctly" });
//     }

//     //second validation: Email exist
//     const adminExist = await Admin.findOne({ email: email });
//     if (!adminExist) return res.status(422).json({ error: "Email not found" });
//     console.log(adminExist);

//     //decrypt password and then compare
//     const passMatch = await bcrypt.compare(password, adminExist.password);

//     //third validation: match password
//     if (!passMatch) return res.status(422).json({ message: "Wrong password" });

//     //if password matches send message + generate and save token
//     const token = adminExist.generateAuthToken();
//     res.cookie("jwtoken", token, {
//       expires: new Date(Date.now() + 25892000000),
//       httpOnly: true,
//     });
//     res.json({ message: "Email found" });
//   } catch (error) {
//     console.log(err);
//   }

// res.send("My admi login page");
// });

router.post("/admin-login", async (req, res) => {
  const { user } = req.body;
  if (user === "admin") {
    try {
      let token;
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Field not filled properly in login page " });
      }

      const adminLogin = await Admin.findOne({ email: email });

      if (adminLogin) {
        token = await adminLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        if (password != adminLogin.password) {
          res.status(400).json({ error: "Incorrect Password" });
        } else {
          res.status(200).json({ message: "Admin login successfully ✌🏼" });
        }
      } else {
        res.status(400).json({ error: "Invalid Credientials" });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
