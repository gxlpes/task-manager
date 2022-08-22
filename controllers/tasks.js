const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}); // get the module and its methods
  res.status(200).json({ tasks }); // you could add the amount of tasks, value, number of hits, etc
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body); // get the module and its methods
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params; // id:taskID is setting an alias as taskID
  const task = await Task.findOne({ _id: taskID }); // returning the docs if successful
  res.status(200).json({ task });
  if (!task) {
    return res.status(404).json({ msg: `No task with the id: ${taskID}` });
  }
});

const updateTask = asyncWrapper( (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).json({ msg: `No task with the id: ${taskID}` });
    }
    res.status(200).json({ task });
  }
)

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with the id: ${taskID}` });
    }
    res.status(200).json({ task });
  });

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
