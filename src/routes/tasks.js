import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();
const router = express.Router();



router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await prisma.user.findMany({
            where: {
                userId: req.user.id
            }
        });
        res.status(200).json({ success: true, data: tasks });
        console.log(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }

});

export default router;
