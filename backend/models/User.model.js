const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create Schema and model

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", UserSchema);
