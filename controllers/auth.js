const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")
const bcrypt = require('bcryptjs');

const register = async ( req, res ) => {
    const { userName, email, password } = req.body
    const salt = await bcrypt.genSalt(10)                 //generating random bits which used to hash password
    const hassedPassword = await bcrypt.hash(password, salt)     // hashing password using salt varaible
   
    const tempUser = { userName, email, password:hassedPassword} //storing all the elements in tempUser varaible
        const user = await User.create( tempUser )
        console.log(user)
        return res.status(StatusCodes.CREATED).json(user)

}

const login = async ( req, res ) => {
    res.send("User login")
}

module.exports = {
    register, login
}