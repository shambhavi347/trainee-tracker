const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

require("../db/database");
router.use(express.static("../client/src/"));
const Student = require("../model/studentSchema");
const { default: isURL } = require("validator/lib/isURL");

var id = 0;

// router.post("/reg-stud", async (req, res) => {
//     const user1 = new Student({
//         prefix: req.body.prefix,
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         Father_name: req.body.Father_name,
//         gender: req.body.gender,
//         email: req.body.email,
//         dob: req.body.dob,
//         phone_no: req.body.phone_no,
//         course: req.body.course,
//         phone_no: req.body.phone_no,
//         stream: req.body.stream,
//         semester: req.body.semester,
//         cgpa: req.body.cgpa,
//         passout_year: req.body.passout_year,
//         famtech: req.body.famtech,
//         inttech: req.body.inttech
//     });
//     if (!prefix ||
//         !first_name || 
//         !last_name || 
//         !Father_name || 
//         !email || 
//         !dob || 
//         !phone_no || 
//         !gender || 
//         !course || 
//         !stream || 
//         !semester || 
//         !cgpa || 
//         !passout_year || 
//         !famtech || 
//         !inttech) {
//         return res
//         .status(400)
//         .json({ error: "Field not filled properly in Registration page " });
//     }
//     try {
//       const userExist = await Student.findOne({ email: user1.email });
//       if (userExist) {
//         console.log("Exist email");
//         return res.status(422).json({ message: "email id already exists" });
//       }
//       await user1.save();
  
//       id = user1._id;
  
//       res.status(201).json({ message: "user register successfull ✌🏼" });
//     } catch (err) {
//       console.log(err);
//     }
// });

router.post("/reg-stud", async (req, res) => {

      try {
        const { prefix, 
        first_name,
        last_name,
        Father_name,
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
        inttech } = req.body;
        
        console.log(req.body);
        //first validation - fileds not empty
        if (
          // !prefix ||
          // !first_name || 
          // !last_name || 
          // !Father_name || 
          // !email || 
          // !dob || 
          !phone_no 
          // || 
          // !gender || 
          // !course || 
          // !stream || 
          // !semester || 
          // !cgpa || 
          // !passout_year || 
          // !famtech || 
          // !inttech
          ) {
          return res
            .status(400)
            .json({ error: "Fields not filled properly in Registration page " });
        }
        console.log("success");
        const userExist = await Student.findOne({email: email })
        if(userExist) {
            return res.status(422).json({error: "Email already Exist"});
        }

        const user = new Student({ prefix, first_name, last_name, Father_name, email, dob, phone_no, gender, course, stream, semester, cgpa, passout_year, famtech, inttech });

        await user.save();
        res.status(201).json({ message: "user registered successfully !!"});
        
        const userRegister = await user.save();
        if(userRegister) {
            res.status(201).json({ message: "user registered successfully !!"});
        } else {
            res.status(500).json({ error: "failed to registered !!"});
        }

      } catch(err) {
        console.log(err);
      }
      
});

module.exports = router;
