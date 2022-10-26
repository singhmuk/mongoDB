const mongoose = require('mongoose');
const Schems = mongoose.Schema;

const userSchema = new Schems({
    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    profilePic: {type:String, default:''},
},
{timestamp:true});

module.exports = mongoose.model("user", userSchema);