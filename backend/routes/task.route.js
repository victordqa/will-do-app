const Task = require("../models/Task.model");
const express = require("express");
const auth = require("../middleware/auth");
require("dotenv").config();
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

    //Hash and salt password
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
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

//* Route:  GET /api/users/get
//* Descr:  Return  registred users
//* Access: Private
router.get("/get", auth, async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
