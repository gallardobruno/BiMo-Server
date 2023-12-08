import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

router.get('/messages', async (req, res) => {
    const messages = await prisma.messages.findMany()
    res.json(messages)
})

router.post('/messages', async (req, res) => {
    const newMessage = await prisma.messages.create({
        data: req.body,
    });
    res.json(newMessage);
})

export default router;