const mongoose = require('mongoose');

const dbConn = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true
}, err=>{
    if(err) throw err;
    console.log('MongoDB connected...')
});

module.exports = dbConn;
