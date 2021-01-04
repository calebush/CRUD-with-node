//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
if(err){
    return console.log('Unable to connect to database')
}
console.log('connection successful');
const db = client.db('TodoApp')

// db.collection('Todos').insertOne({
//     text:"I will handle this later",
//     completed:false,
// }, (err, result)=>{
//     if(err){
//         return console.log('Cannot insert todo', err);
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2));
// })

// db.collection('Users').insertOne({
//     name:'Caleb',
//     Age:25
// }, (err, results)=>{
//     if(err){
//        return console.log('Unable to insert the user', err)
//     }
//     console.log("User inserted", JSON.stringify(results.ops, undefined, 2))
// })

client.close();
})