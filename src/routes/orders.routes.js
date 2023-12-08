import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

router.get('/orders', async (req, res) => {
    const orders = await prisma.orders.findMany()
    res.json(orders)
})

router.post('/orders', async (req, res) => {
    const newOrder = await prisma.orders.create({
        data: req.body,
    });
    res.json(newOrder);
})

export default router;