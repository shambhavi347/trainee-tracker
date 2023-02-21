const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/database");
router.use(express.static("../client/src/"));
const student = require("../model/studentSchema");
const trainee = require("../model/traineeSchema");

//traineeRegestration
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

        var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        if(email.length>254) {
        return res.status(422).json({ error: "Fill the Email ID correctly !!" });
        }

        var emailValid = emailRegex.test(email);
        if(!emailValid) {
        return res.status(422).json({ error: "Fill the Email ID correctly !!" });
        }

        // Further checking of some things regex can't handle
        var parts = email.split("@");
        if(parts[0].length>64) {
        return res.status(422).json({ error: "Fill the Email ID correctly !!" });
        }

        var domainParts = parts[1].split(".");
        if(domainParts.some(function(part) { return part.length>63; })) {
        return res.status(422).json({ error: "Fill the Email ID correctly !!" });
        }

        //third -- email !exist in trainee db 

        const userExist = await trainee.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email Id already Exist !!" });
        }

        // forth -- check password format

        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        const passwordValid = passwordRegex.test(password);

        if(!passwordValid) {
            return res.status(422).json({ error: "Min 8 letter password, with at least a symbol, upper and lower case letters and a number !!" });
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
            return res.status(422).json({ error: "Fill, already registered Email !!" });
        }

        const user = new trainee({
            email, password,
        });
        await user.save();
        res.status(201).json({ message: "Trainee registered successfully !!" });

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
