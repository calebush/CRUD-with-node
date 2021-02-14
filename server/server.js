const mongoose = require('./db/mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const { Todo } = require('./models/Todo');
const{ObjectID}= require('mongodb');
const _=require('lodash');
const { Users } = require('./models/User');
const {authenticate}  = require('./middleware/authenticate');

const app = express();

app.use(bodyParser.json())

const port = process.env.PORT || 5000;

app.post('/todos', authenticate, (req, res)=>{
var newTodo = new Todo({
    text:req.body.text,
    _creator: req.user._id 
});
newTodo.save().then((doc)=>{
    res.send(doc)
}, (e)=>{
    res.status(400).send(e);
})
});

app.get('/todos', authenticate, (req,res)=>{
    Todo.find({_creator:req.user._id}).then((todos)=>{
        res.send({todos})
    })
},(err)=>{
    res.status(400).send(err)
})

//GET TODOS BY ID
app.get('/todos/:id', authenticate, (req,res)=>{
    var id = req.params.id
    if(!ObjectID.isValid(id)){
     return   res.status(404).send()
    }

Todo.findOne({
    _id:id,
    _creator:req.user._id
}).then((todo)=>{
if(!todo){
  return  res.status(404).send()
}
res.send({todo})
}).catch((e)=>{
res.status(400).send()
})
})

//DELETE BY ID
app.delete('/todos/:id', authenticate, (req, res)=>{
    var id =req.params.id

    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findOneAndRemove({_id:_id, _creator:req.user._id}).then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }
    res.send(todo)
    }).catch((e)=>{
        res.status(400).send();
    })
   
})

//ROUTE TO UPDATE
app.patch('/todos/:id', authenticate, (req,res)=>{
    var id = req.params.id;
    const body = _.pick(req.body, ["text","completed"]);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completeAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completeAt = null;
    }

    Todo.findOneAndUpdate({_id:_id, _creator:req.user._id}, {$set:body}, {new:true}).then((todo)=>{
        if(!todo){
            res.status(400).send()
        }
        res.send({todo});
    }).catch((err)=>{
        res.status(400).send();
    })
})

//POST /users  
app.post('/users', (req, res)=>{
    var body = _.pick(req.body, ['email', 'password']);
    var user = new Users(body);
    user.save().then(()=>{
       return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(user)
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

//Private Route Auth Middleware
app.get('/users/me', authenticate, (req,res)=>{
    res.send(req.user)
});

//POST /users/login {email, password}
app.post('/users/login', (req, res)=>{
    var body = _.pick(req.body, ['email', 'password']);
    Users.findByCredentials(body.email, body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth', token).send(user)
        })
    }).catch((e)=>{
        res.status(400).send();
    });
});

//LOGOUT delete route, remove token
app.delete('/users/me/token', authenticate, (req, res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }, ()=>{
        res.status(400).send();
    });
});
 

app.listen(port, ()=>{
    console.log(`App started at port ${port}`)
})


module.exports={app}
