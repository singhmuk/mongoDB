const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userSchema = require('../modules/user');


router.put("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id){
        console.log('gets')
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await userSchema.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new:true});
            res.status(200).json(updatedUser)
        }catch(err){
            res.status(5000).json(err);
        }
    }else{
        res.status(401).json("You can update only your account!");
    }
})

router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id){
        try{
            const user = await userSchema.findById(req.params.id);
        try{
            await userSchema.findByIdAndDelete(req.params.id);

            res.status(200).json("User has been deleted")
        }catch(err){
            res.status(5000).json(err);
        }
    } catch(err){
        res.status(404).json("User not found")
    }
    }else{
        res.status(401).json("You can delete only your account!");
    }
})

router.get("/:id", async (req,res) => {
    try{
        const user = await userSchema.findById(req.params.id);
        const {password, ...others} = user;
        res.status(500).json(others)
    }catch (err){
        res.status(500).json(err)
    }
})

router.get("/", async(req,res) => {
    try{
        userSchema.find()
            .then(users=>res.json(users))
    }catch (err){
        res.status(500).json('Users not found')
    }
})

module.exports = router;
