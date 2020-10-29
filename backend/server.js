const mongoose = require("mongoose");
require("dotenv").config();

//Connect to Mongo DB Atlas
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });

//Check pending connection
const db = mongoose.connection;
db.on("error", () => console.log("Couldn't connect to MongoDB"));
db.once("open", () => console.log("Connection Succsessful!"));
