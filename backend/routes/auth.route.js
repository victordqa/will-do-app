const User = require("../models/User.model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

//* Route:  POST /api/users/auth
//* Descr:  Authenticate user
//* Access: Public
router.post("/auth", async (req, res) => {
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
    salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    let newUser = new User({ username, email, password: hashedPassword });
    let savedUser = await newUser.save();
    jwt.sign(
      { _id: savedUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token, username: savedUser.username });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server error" });
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
