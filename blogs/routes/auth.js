const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userSchema = require('../modules/user');


router.post("/register", async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUSer = new userSchema({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        })
        const users = await newUSer.save();
        res.status(200).json(users)
    }catch(err){
        res.status(5000).json(err);
    }
})

router.post("/login", async (req, res) => {
    try{
        const user = await userSchema.findOne({username: req.body.username})
        !user && res.status(500).json("Wrong Credential")

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(500).json("Wrong Credential")

        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;
