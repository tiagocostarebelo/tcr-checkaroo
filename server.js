import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from './generated/prisma/index.js';

const app = express();

const PORT = process.env.PORT || 5000;

const prisma = new PrismaClient();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// BASIC REQUEST
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Checkaroo' });
})

app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ success: true, data: users });
        console.log(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});