const express = require("express");
const Task = require("../models/Task.model");
const auth = require("../middleware/auth");

const router = express.Router();

//* Route:  POST /api/task/add
//* Descr:  Register new task
//* Access: Private
router.post("/add", auth, async (req, res) => {
  try {
    let { description, importance } = req.body;
    let userId = req.user._id;
    //Validations
    if (!description) {
      res.status(400).json({ msg: "Please enter the description" });
    }
    newTask = new Task({ userId, description, importance });
    await newTask.save();
    res.json({ msg: "Task added!" });
  } catch (e) {
    console.error(e);
  }
});

//* Route:  DELETE /api/task/delete
//* Descr:  Delete a task by ID
//* Access: Private

router.delete("/delete", auth, async (req, res) => {
  let taskId = req.body.taskId;
  console.log("---------- taskId from server", taskId);
  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ msg: "Task deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: e.message });
  }
});

//* Route:  GET/api/task/user_tasks
//* Descr:  Get all tasks of a logged user
//* Access: Private
router.get("/user_tasks", auth, async (req, res) => {
  try {
    let userId = req.user._id;

    //Validations
    if (!userId) {
      res.status(400).json({ msg: "No user id" });
    }
    // Get all tasks, sort descending
    let tasks = await Task.find({ userId }).sort({ importance: -1 });
    res.json(tasks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
});

//* Route:  GET/api/task/all_tasks
//* Descr:  TESTING Get all tasks in datasabse
//* Access: Public
// router.get("/all_tasks", async (req, res) => {
//   try {
//     // Get all tasks, sort descending
//     let tasks = await Task.find().sort({ importance: -1 });
//     res.json(tasks);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

module.exports = router;
