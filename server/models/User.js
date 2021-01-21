const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const _ = require('lodash')

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:3,
        trim:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is invalid email'
        }
    },
    password:{ 
        type:String,
        required:true,
        minlength:6,
    },
    tokens:[{
        access:{
            type:String,
            required:true,
        },
        token:{
            type:String,
            required:true,
        }
    }]
})

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken= function(){
    var user = this;
    var access ='auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, '123abcd').toString();

    user.tokens.push({access, token});

    return user.save().then(()=>{
        return token;
    })
}

var Users = mongoose.model('Users',UserSchema)


module.exports={Users}