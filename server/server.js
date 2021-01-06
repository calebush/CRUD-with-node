const mongoose = require('./db/mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const { Todo } = require('./models/Todo');

const app = express();

app.use(bodyParser.json())

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

app.listen(5000, ()=>{
    console.log('App started at port 5000')
})



