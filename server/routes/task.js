const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/task');

router.route('/tasks').get(authMiddleware, getTasks).post(authMiddleware, createTask);
router
  .route('/tasks/:id')
  .get(authMiddleware, getTaskById)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

module.exports = router;
