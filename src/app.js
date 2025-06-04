import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '../generated/prisma/index.js';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// BASIC REQUEST
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Checkaroo' });
})


// ROUTE TEST TO USERS
app.get('/api/v1/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                tasks: true,
                labels: true
            }
        });
        res.json({ success: true, data: users });
        console.log(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
})


// ROUTE TEST TO TASKS
app.get('/api/v1/tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json({ success: true, data: tasks });
        console.log(tasks)
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
})

export default app;