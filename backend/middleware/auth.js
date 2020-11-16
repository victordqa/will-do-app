const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  //Validate token
  console.log("entered auth");
  let token = req.header("x-auth-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({ msg: "Please register or log in" });
  }
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);

    //add user id from payload to request
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
