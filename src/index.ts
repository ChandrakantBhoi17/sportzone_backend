import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './db.js';
import apiRouter from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ 
  origin: ['http://localhost:5173', 'http://localhost:8080', 'http://127.0.0.1:5173', 'http://127.0.0.1:8080','https://truptienterprises.in']
}));
app.use(express.json());

// Routes
app.use('/api', apiRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port 4000`));
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

export default app;

