const mongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId


mongoClient.connect('mongodb://localhost/workshoptdc')
    .then(conn => global.conn = conn.db('workshoptdc'))
    .catch(err => console.log(err));

function findOne(id, callback) {
    global.conn.collection('customers').find(new ObjectId(id)).toArray(callback)
}

function deleteOne(id, callback) { 
    global.conn.collection('customers').deleteOne({_id:new ObjectId(id)}, callback)
}

function findAll(callback) {
    global.conn.collection('customers').find({}).toArray(callback)
}

function insert(customer, callback) {
    global.conn.collection('customers').insert(customer, callback)
}

function updateOne(id, customer, callback){
    global.conn.collection("customers").updateOne({_id:new ObjectId(id)}, { $set: customer }, callback);
}


module.exports = { findAll, insert, updateOne, findOne, deleteOne }



