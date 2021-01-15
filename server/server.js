const mongoose = require('./db/mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const { Todo } = require('./models/Todo');
const{ObjectID}= require('mongodb');

const app = express();

app.use(bodyParser.json())

const port = process.env.PORT || 5000;

app.post('/todos', (req, res)=>{
var newTodo = new Todo({
    text:req.body.text
});
newTodo.save().then((doc)=>{
    res.send(doc)
}, (e)=>{
    res.status(400).send(e);
})
});

app.get('/todos', (req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    })
},(err)=>{
    res.status(400).send(err)
})

//GET TODOS BY ID
app.get('/todos/:id', (req,res)=>{
    var id = req.params.id

    if(!ObjectID.isValid(id)){
     return   res.status(404).send()
    }

Todo.findById(id).then((todo)=>{
if(!todo){
  return  res.status(404).send()
}
res.send({todo})

}).catch((e)=>{
res.status(400).send()
})
})

//DELETE BY ID
app.delete('/todos/:id', (req, res)=>{
    var id =req.params.id

    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }
    res.send(todo)
    }).catch((e)=>{
        res.status(400).send();
    })
   
})


app.listen(port, ()=>{
    console.log(`App started at port ${port}`)
})


module.exports={app}
