import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// BASIC REQUEST
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Checkaroo' });
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});