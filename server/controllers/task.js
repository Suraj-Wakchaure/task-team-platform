const Task = require('../models/task');

const getTasks = async (req, res) => {
  try {
    const { search, status, priority, sortBy, order } = req.query;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    const sortField = sortBy || 'dueDate';
    const sortOrder = order === 'desc' ? -1 : 1;

    const tasks = await Task.find(query)
      .populate('user', 'name email')
      .populate('assignedUser', 'name email')
      .sort({ [sortField]: sortOrder });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('user', 'name email')
      .populate('assignedUser', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate, assignedUser } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: 'Title and Due Date are required' });
    }

    const task = await Task.create({
      title,
      description,
      priority: priority || 'Medium',
      status: status || 'Pending',
      dueDate,
      user: req.user._id,
      assignedUser: assignedUser || req.user._id,
    });

    const populatedTask = await Task.findById(task._id)
      .populate('user', 'name email')
      .populate('assignedUser', 'name email');

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.body.assignedUser === '') {
      req.body.assignedUser = null;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('user', 'name email')
      .populate('assignedUser', 'name email');

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Task deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
