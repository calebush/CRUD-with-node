const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
// console.log('deleted', result)
// })

Todo.findByIdAndRemove('600185254ef052590bec3311').then((result)=>{
    console.log('deleted', result)
})
