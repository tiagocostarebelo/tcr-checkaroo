import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                tasks: true,
                labels: true
            }
        });
        res.status(200).json({ success: true, data: users });
        console.log(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }

})

export default router;