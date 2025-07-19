import express from 'express';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/authRoutes.js';  // NEW
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);  // NEW: Auth routes
app.use('/api/todos', todoRoutes);  // Same

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));