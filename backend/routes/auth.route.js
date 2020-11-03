const User = require("../models/User.model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

//* Route:  POST /api/auth
//* Descr:  Authenticate user
//* Access: Public
router.post("/", async (req, res) => {
  try {
    let { email, password } = req.body;

    //Validations
    if (!email || !password) {
      return res.status(400).json({ msg: "Please, enter all fields" });
    }

    //Check if user exists
    let isRegistred = await User.findOne({ email });
    if (!isRegistred) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    //Verify password
    let savedUser = await User.findOne({ email });
    let match = await bcrypt.compare(password, savedUser.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid password" });
    } else {
      jwt.sign(
        { _id: savedUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: savedUser.id,
              name: savedUser.username,
              email: savedUser.email,
            },
          });
        }
      );
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

//* Route:  GET /api/users/get
//* Descr:  Return  registred users
//* Access: To pe Private
router.get("/get", async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
