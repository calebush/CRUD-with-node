const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
if(err){
    return console.log('Unable to connect to database')
}
console.log('connection successful');
const db = client.db('TodoApp')
 

// db.collection('Todos').findOneAndUpdate({_id:new ObjectID("5ff4791680da492f81fc212c")}, 
// {
//     $set:{
//     completed:true
// }
// },
// {
//     returnOriginal:false,
// }
// ).then((result)=>{
//     console.log(result)
// })

/*INCREAMENT*/
db.collection('Users').findOneAndUpdate({_id:new ObjectID("5ff3379780da492f81fc023f")},
{
    $set:{
        name:"Bush"
    },

    $inc:{
        Age:2
    }

},{
     returnOriginal:false
}
).then((res)=>{
    console.log(res)
})

//client.close();
})