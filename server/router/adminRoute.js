const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/adminauth");

require("../db/database");
router.use(express.static("../client/src/"));
const Admin = require("../dbmodel/admin");

router.get("/admin-dashboard", authenticate, (req, res) => {
  var adminID = req.rootUser._id;
  User.find({ _id: { $in: adminID } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
