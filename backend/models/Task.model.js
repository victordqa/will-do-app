const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Create Schema

const TaskSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId },
        description: { type: String, required: true },
        importance: { type: Number, default: 0 },
        isCompleted: { type: Boolean, default: false },
    },
    { timestamps: true }
)

//Create model
module.exports = Task = mongoose.model('task', TaskSchema)
