const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// const message = "I am Caleb";
// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hashed: ${hash}`);

var password  = '123456'
// bcrypt.genSalt(10, (err, salt)=>{
//     bcrypt.hash(password, salt, (err, hash)=>{
//         console.log("hashed value:",hash)
//     })
// })

var hashedPassword='$2a$10$aVOfKkM5zTG/8oTN0Qf7TuXJkoKaKjkx/hUx.qN9BB73nFslxYBqi';

bcrypt.compare(password, hashedPassword, (err, res)=>{
    console.log(res)
})

const data = {
    id:22
}

var token = jwt.sign(data, '123sectret');
console.log(token)

const decoded = jwt.verify(token, '123sectret');
console.log('decoded', decoded)