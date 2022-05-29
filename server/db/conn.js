const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let _db; // NOTE: used let instead of var. See if this causes problems

module.exports = {
    // FUTURE: replace with arrow functions?
    connectToServer: function(callback) {
        client.connect(function(err, db) {
            // Verify we got a good db object
            if(db) {
                _db = db.db("animals");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },
    getDb: () => {
        return _db;
    }
}