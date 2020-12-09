const jwt = require('jsonwebtoken')
require('dotenv').config()

//Middleware that makes certain routes private by checking if there is a token on the request's header.
//Also verifies if token is valid

function auth(req, res, next) {
    //Validate token
    let token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).json({ msg: 'Please register or log in' })
    }
    try {
        //Validate
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        //Add user id from payload to request
        req.user = decoded
        next()
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'Invalid token' })
    }
}

module.exports = auth
