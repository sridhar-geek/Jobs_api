const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth =  (req, res, next ) => {
    const header = req.headers.authorization

    if(!header || !header.startsWith('Bearer'))
        throw new UnauthenticatedError('Authentication invalid')

    const token = header.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(payload.userId)
        // const user =  User.findById(payload.userId).select('-password')
        // req.user = user
        // console.log(req.user)
        req.user = { userId: payload.userId, name: payload.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authenication invalid')
    }
}
   
module.exports = auth