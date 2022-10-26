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


module.exports = router;
