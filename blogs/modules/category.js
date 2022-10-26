const mongoose = require('mongoose');
const Schems = mongoose.Schema;

const categorySchema = new Schems({
    name: {type:String, required:true}
},
{timestamp:true});

module.exports = mongoose.model("category", categorySchema);