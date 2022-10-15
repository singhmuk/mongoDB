var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("nodeJs");
    dbo.createCollection("customers", (err, res) => {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});