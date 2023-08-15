const mongoose = require('mongoose');

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

 module.exports = mongoose.model("User", UserSchema)