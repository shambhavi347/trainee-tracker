const express = require('express');
const router = express.Router();
require('../db/database');
const institute = require("../dbmodel/instituteSchema");

router.get('/',(req, res) => {
    res.send("hello this is institute reg backend");
});

//checks if the fields are filled or not
router.post('/institute-reg', async (req, res) =>{
    const { name, email, month, duration, rating, rvalue, type, street, city, state, country, zipcode, phoneno, coordName, coordEmail, coordPhone, password} = req.body;
     if(!name || !email || !month || !duration || !rating || !rvalue || !type || !street || !city || !state || !country || !zipcode || !phoneno || !coordName || !coordEmail || !coordPhone || !password){
        return res.status(422).json({error: "Please fill all the fields properly"});
     }

     try{
        //checks if its a new registration or not 
      const instituteExist = await institute.findOne({email: email})
      if(instituteExist){
            return res.status(422).json({error: "Institute already Exists"});
        }
        //if both key and value are same then you dont need to write name of both like name:name
        const institute = new institute({name, email, month, duration, rating, rvalue, type, street, city, state, country, zipcode, phoneno, coordName, coordEmail, coordPhone, password});
        const instituteReg= await institute.save();
        if(instituteReg){
            res.status(201).json({ message: "Institute successfully registered!✌"}); 
        }
        else{
            res.status(500).json({error: "Failed to register☹" });
        }
    }catch(err){
        console.log(err);
    }    
});

module.exports =router;
