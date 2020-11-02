const User = require("../models/User.model");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

//* Route:  POST /api/users/add
//* Descr:  Register new user
//* Access: Public
router.post("/add", async (req, res) => {
  try {
    let { username, email, password } = req.body;

    //Validations
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please, enter all fields" });
    }

    //Check if new user has a unique email adress

    let isRegistred = await User.findOne({ email });
    if (isRegistred) {
      return res.status(400).json({ msg: "User already registred" });
    }
    //Create new user
    let newUser = new User({ username, email, password });
    await newUser.save();
    res.json({ msg: "User created!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
