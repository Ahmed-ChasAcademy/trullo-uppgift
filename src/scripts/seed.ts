import mongoose from 'mongoose';
import { User } from '../models/User';
import { Task } from '../models/Task';
import { connectDB } from '../config/database';
import 'dotenv/config';

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});

    // Create users
    const user1 = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });

    const user2 = new User({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123'
    });

    await user1.save();
    await user2.save();

    console.log('Users created:', {
      user1: { id: user1._id, email: user1.email },
      user2: { id: user2._id, email: user2.email }
    });

    // Create tasks with mixed statuses
    const tasks = [
      {
        title: 'Design homepage',
        description: 'Create wireframes for homepage layout',
        status: 'to-do' as const,
        assignedTo: user1._id
      },
      {
        title: 'Fix login bug',
        description: 'Users cannot login with special characters',
        status: 'in progress' as const,
        assignedTo: user2._id
      },
      {
        title: 'API documentation',
        description: 'Write documentation for all endpoints',
        status: 'blocked' as const,
        assignedTo: null
      },
      {
        title: 'Database setup',
        description: 'Set up production database',
        status: 'done' as const,
        assignedTo: user1._id
      }
    ];

    await Task.insertMany(tasks);
    console.log('4 tasks created with mixed statuses');

    console.log('Seed data completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed data error:', error);
    process.exit(1);
  }
};

seedData();