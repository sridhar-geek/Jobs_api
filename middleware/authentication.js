const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next ) => {
    const header = req.headers.authorization

    if(!header || !header.startWith('Bearer'))
        throw new UnauthenticatedError('Authentication invalid')

    const token = header.split(' ')[1]
}
   