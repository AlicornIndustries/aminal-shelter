const { ObjectID, setInternalBufferSize } = require("bson");
const express = require("express");

// recordRoutes is an instance of the express route, takes control of requests starting with path /record
const recordRoutes = express.Router();

const dbo = require("mongodb").ObjectId;

// Get list of all records
recordRoutes.route("/record").get( (req,res) => {
    let db_connect = dbo.getDb("animals"); // FUTURE: can we move these "animals" strings into a config file?
    db_connect
        .collection("records")
        .find({})
        .toArray( (err, result) => {
            if(err) throw err;
            res.json(result);
        });
});

// Get single record by id
recordRoutes.route("/record/:id").get( (req,res) => {
    let db_connect = dbo.getDb(); // ??: why no "animals" string like above?
    let myquery = { _id: ObjectID( req.params.id )};
    db_connect
        .collection("records")
        .findOne(myquery, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
});

// Post/Create new record
// ??: why use response instead of res here and in .delete below?
recordRoutes.route("/record/add").post( (req, response) => {
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectID(req.params.id)};
    let newvalues = {
        $set: {
            name: req.body.name,
            microchipNumber: req.body.microchipNumber,
            species: req.body.species
        }
    }
});

// Update record by id
recordRoutes.route("/update/:id").post( (req, response) => {
    let db_connect = dbo.getDb(); 
    let myquery = { _id: ObjectId( req.params.id )}; 
    let newvalues = {   
      $set: {     
        name: req.body.name,    
        position: req.body.position,     
        level: req.body.level,   
      }
     }
});

// Delete a record
recordRoutes.route("/:id").delete( (req,response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectID(req.params.id)};
    db_connect.collection("records").deleteOne(myquery, (err,obj) => {
        if(err) throw err;
        console.log(`1 document deleted. id: ${req.params.id}`); // TODO: change to slightly more verbose?
        response.json(obj);
    });
});

module.exports = recordRoutes;