const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// validating the data model to be inserted in mongodb
// User schema is provided by mongooes and helps to define a structure what type of data to be added
 const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "please provide UserName"],
        maxlength: 25,
        minlength:3,
    },

    email: {
        type: String,
        required: [true, "please provide email"],
        match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "please provide a valid email"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "please provide password"],
        minlength: 8,
    }
 });

 /**
  * this is a mongooes middleware (pre) we can do some operation using these middleware
  * it'll (pre middleware) excute first and pass to the next function
  * we didn't need next() as mongooes 5.5 supports it 
  * 
  * Basically it helps to reduce the code in the controller
  * bypassing the code to other function and increse readability, maintainablity
  */

 // hash the password before storing it in the database
 UserSchema.pre('save', async function () {
        const salt = await bcrypt.genSalt(10)                 //generating random bits which used to hash password
        this.password = await bcrypt.hash(this.password, salt)     // hashing password using salt varaible
 });

 // this helps to create jwt token for the user
 UserSchema.methods.createJWT = function () {
    const token =  jwt.sign( { userId: this._id, name:this.name }, process.env.JWT_SECRET, { expiresIn: process.env.TIME })
    return token;
};

// compare password and returns boolean
UserSchema.methods.comparePassword = async function ( givenPassword ) {
    const isCorrect = await bcrypt.compare(givenPassword , this.password)
    return isCorrect;
}

 module.exports = mongoose.model("User", UserSchema)