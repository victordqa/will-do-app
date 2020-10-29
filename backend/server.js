const mongoose = require("mongoose");
const express = require("express");

require("dotenv").config();

//Connect to Mongo DB Atlas
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Check pending connection
const db = mongoose.connection;
db.on("error", () => console.log("Couldn't connect to MongoDB"));
db.once("open", () => console.log("Connection to DB succsessful!"));

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
