import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '../generated/prisma/index.js';

// IMPORT ROUTES
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();
const app = express();

const prisma = new PrismaClient();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// BASIC REQUEST
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Checkaroo API' });
});

// ROUTES REQUESTS
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);


// GLOBAL ERROR HANDLING 
app.use((err, req, res, next) => {
    console.error('Global Error Handler Caught:', err.stack || err);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Something went wrong on the server!'
    });
});

export default app;