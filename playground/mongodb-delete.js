const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
if(err){
    return console.log('Unable to connect to database')
}
console.log('connection successful');
const db = client.db('TodoApp')
 
//deleteMany
// db.collection('Todos').deleteMany({text:"Node Js Course"}).then((result)=>{
//     console.log(result)
// },(err)=>{
//     console.log("Unable to delete records....")
// })

//deleteOne
// db.collection('Todos').deleteOne({text:"go home"}).then((result)=>{
//     console.log(result)
// },(err)=>{
//     console.log("Unable to delete records....")
// })

/*findOneAndDelete*/
db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    console.log(result)
})



//client.close();
})