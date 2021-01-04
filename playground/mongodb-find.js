const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
if(err){
    return console.log('Unable to connect to database')
}
console.log('connection successful');
const db = client.db('TodoApp')
 
/*fetch specific data*/
// db.collection('Todos').find({
//     _id: new ObjectID('5fefb0cba857c420e003f317')
// }).toArray().then((docs)=>{
//     console.log('Todos:', JSON.stringify(docs, undefined, 2))
// }, (err)=>{
//     console.log('Unable to fetch', err)
// })

/*Count all records*/
// db.collection('Todos').find().count().then((count)=>{
//     console.log(`Todos Number: ${count}`)
// }, (err)=>{
//     console.log('Unable to fetch', err)
// })

/*Find by Name */

db.collection('Users').find({name:"Mike"}).toArray().then((list)=>{
    console.log("Users:", JSON.stringify(list,undefined,2))
}, (err)=>{
    console.log("Unable to fetch data", err)
})

client.close();
})