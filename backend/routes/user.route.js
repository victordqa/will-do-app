const User = require('../models/User.model')
const express = require('express')

route = express.Router()

//* Route:  POST /api/users/register
//* Descr:  Register new user
//* Access: Public
route.post('/register', await (req, res)=>{})



module.exports = route