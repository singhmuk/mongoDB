const express = require('express');
const router = express.Router();
const userSchema = require('../modules/user');


router.post("/register", async (req,res)=>{
    try{
        const newUSer = new userSchema({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
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

        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;
