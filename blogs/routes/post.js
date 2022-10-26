const express = require('express');
const router = express.Router();
const postSchema = require('../modules/post');


router.post("/", async (req,res)=>{
   const newPost = new postSchema(req.body);
   try{
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
   }catch (err){
    res.status(500).json(err)
   }
})

router.put("/:id", async (req,res) => {
    try{
        const post = await postSchema.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const updatedPost = await postSchema.findByIdAndUpdate(req.params.id, {
                     $set: req.body
                },{new: true})
                res.status(200).json(updatedPost);
            }catch (err){
                res.status(401).json(err)
            }
        }else {
            res.status(401).json("You can update only your post!");
          }
    }catch (err){
        res.status(500).json(err);
    }
})

router.delete("/:id", async (req,res)=>{
    try{
        const post = await postSchema.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                await post.delete();
                res.status(200).json("Post has been deleted")
            }catch (err){
                res.status(500).json(err)
            }
        }
    }catch (err){
        res.status(500).json(err);
    }
})

router.get("/:id", async (req,res) => {
    try{
        const post = await postSchema.findById(req.params.id);
        res.status(200).json(post)
    }catch (err){
        res.status(500).json(err)
    }
});


router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await postSchema.find({ username });
      } else if (catName) {
        posts = await postSchema.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await postSchema.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
