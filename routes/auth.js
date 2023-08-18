const express = require('express');
const router = express.Router()

        // IMPORTS
const { register, login } = require("../controllers/auth")


router.route('/login').post(login)
router.route('/register').post(register)

module.exports = router;