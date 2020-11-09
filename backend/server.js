const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
//  install and require cors

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

//Load express json parser and CORS
app.use(express.json());
app.use(cors());

//Import routes
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const taskRoute = require("./routes/task.route");

//Mount routes on express app
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
