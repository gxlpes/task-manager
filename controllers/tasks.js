const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}); // get the module and its methods
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body); // get the module and its methods
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params; // id:taskID is setting an alias as taskID
    const task = await Task.findOne({ _id: taskID }); // returning the docs if successful
    res.status(200).json({ task });
    if (!task) {
      return res.status(404).json({ msg: `No task with the id: ${taskID}` });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).json({ msg: `No task with the id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with the id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
