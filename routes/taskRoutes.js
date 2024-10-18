const express = require('express');
const { getAllTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

// Update the route paths to include `/api`
router.get('/api/tasks', getAllTasks);
router.post('/api/tasks', addTask);
router.put('/api/tasks/:id', updateTask);
router.delete('/api/tasks/:id', deleteTask);

module.exports = router;