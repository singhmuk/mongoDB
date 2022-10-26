const express = require('express');
const router = express.Router();
const catSchema = require('../modules/category')

router.post("/", async (req,res) => {
    const newCat = new catSchema(req.body);
    try{
        const savedCat = await newCat.save();
        res.status(200).json(savedCat)
    }catch (err){
        res.status(500).json(err)
    }
});

router.get("/", async (req,res) => {
    try{
        const catgs = await catSchema.find();
        res.status(200).json(catgs)
    }catch (err){
        res.status(500).json(err)
    }
});

module.exports = router;