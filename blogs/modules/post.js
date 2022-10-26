const mongoose = require('mongoose');
const Schems = mongoose.Schema;

const postSchema = new Schems({
    title: {type:String, required:true, unique:true},
    description: {type:String, required:true},
    photo: {type:String, required:false},
    username: {type:String, required:true},
    categories: {type:Array, required:false},
},
{timestamp:true});

module.exports = mongoose.model("post", postSchema);