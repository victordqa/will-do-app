const User = require('../models/User.model')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
require('dotenv').config()
const router = express.Router()

//* Route:  POST /api/auth
//* Descr:  Authenticate user
//* Access: Public
router.post('/', async (req, res) => {
    try {
        let { email, password } = req.body

        //Validations
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please, enter all fields' })
        }

        //Check if user exists
        let isRegistred = await User.findOne({ email })
        if (!isRegistred) {
            return res.status(400).json({ msg: 'User does not exist' })
        }

        //Find user based on unique email
        let savedUser = await User.findOne({ email })
        //Check if password matches
        let match = await bcrypt.compare(password, savedUser.password)
        if (!match) {
            return res.status(400).json({ msg: 'Invalid password' })
        } else {
            jwt.sign(
                //Token payload wiill be user id
                { _id: savedUser._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: 3600,
                },
                (err, token) => {
                    if (err) throw err
                    res.json({
                        //On succsess authentication, responds with token and user info
                        token,
                        user: {
                            id: savedUser.id,
                            name: savedUser.username,
                            email: savedUser.email,
                        },
                    })
                }
            )
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: error.message })
    }
})

//* Route:  GET /api/auth /user
//* Descr:  Return  user data based user token
//* Access: Private
router.get('/user', auth, async (req, res) => {
    try {
        let user = await User.findById(req.user._id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Server error' })
    }
})

module.exports = router
