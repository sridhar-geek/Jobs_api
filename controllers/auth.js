const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, UnauthenticatedError } = require('../errors')


// in this register function we created a new user in database and create token for that user 
// and finally in the response we are returning username and token
const register = async ( req, res ) => {
    const user = await User.create( req.body )     // password is hashed using pre middleware, here we're just creating user in database
     const token = user.createJWT()                // creation of jwt token is already done, we are storing it in the token varaible
     return res.status(StatusCodes.CREATED).json( { user: {name:user.userName}, token} )
}
    
    
    // in this login function we verify user and assign a token to him finally send back token and username
const login = async ( req, res ) => {
    const { email, password } = req.body
    
    if( !email || !password )
        throw new BadRequestError('Please provide email and password')
    
    const user = await User.findOne( {email} )      // finding whether email id is present in database or not 
    if( !user )
    throw new UnauthenticatedError('No User found')

    const isPasswordCorrect = await user.comparePassword( password )  // middleware function checks whether password is valid or not
    if(!isPasswordCorrect)
    throw new UnauthenticatedError("Invalid Credentials")

    const token = user.createJWT()       // creating token again
    res.status(StatusCodes.OK).json({ user: { name: user.userName },token })
}

module.exports = {
    register, login
}

/**
 * http status codes is a package which gives status codes
 * created means 201
 * ok means 200
 * instead of numberic values we can use this package this makes code readble
 */