const mongoose = require("mongoose");
const express = require("express");
//  i and require cors

require("dotenv").config();

//Connect to Mongo DB Atlas
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Check pending connection
const db = mongoose.connection;
db.on("error", () => console.log("Couldn't connect to MongoDB"));
db.once("open", () => console.log("Connection to DB succsessful!"));

//Load express
const app = express();
const port = process.env.PORT || 5000;

//Load express json parser
app.use(express.json());

//Import routes
const userRoute = require("./routes/user.route");

//Mount routes on express app
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
