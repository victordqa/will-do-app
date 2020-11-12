const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  //Validate token
  let token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Please register or log in" });
  }
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);

    //add user id from payload to request
    req.user = decoded;
    next();
  } catch (e) {
    console.error(error.message);
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
