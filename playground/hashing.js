const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

// const message = "I am Caleb";
// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hashed: ${hash}`);

const data = {
    id:22
}

var token = jwt.sign(data, '123sectret');
console.log(token)

const decoded = jwt.verify(token, '123sectret');
console.log('decoded', decoded)