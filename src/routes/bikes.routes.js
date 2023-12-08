import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

router.get('/bikes', async (req, res) => {
    const bikes = await prisma.bikes.findMany()
    res.json(bikes)
})

router.post('/bikes', async (req, res) => {
    const newBike = await prisma.bikes.create({
        data: req.body,
    });
    res.json(newBike);
})

export default router;