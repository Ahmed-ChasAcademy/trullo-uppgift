import express from 'express';
import { connectDB } from './config/database';
import 'dotenv/config';
import userRoutes from './routes/userRoutes';
import taskRouters from './routes/taskRoutes'

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRouters)

app.get('/', (req, res) => {
  res.json({ message: 'Trullo API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});