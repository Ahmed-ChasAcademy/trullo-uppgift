import express from 'express';
import { Task } from '../models/Task';
import { User } from '../models/User';

const router = express.Router();

// Create task
router.post('/', async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;

    // Validate assignedTo user exists if provided
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) {
        return res.status(400).json({ error: 'Assigned user not found' });
      }
    }

    const task = new Task({
      title,
      description,
      status,
      assignedTo
    });
    
    await task.save();
    await task.populate('assignedTo', 'name email');
    
    res.status(201).json(task);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;

    // Validate assignedTo user exists if provided
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) {
        return res.status(400).json({ error: 'Assigned user not found' });
      }
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, assignedTo },
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;