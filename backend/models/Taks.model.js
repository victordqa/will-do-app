const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create Schema and model

const TaskSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId },
    description: { type: String, required: true },
    importance: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = Task = mongoose.model("task", TaskSchema);
