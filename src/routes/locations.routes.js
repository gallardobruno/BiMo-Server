import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

router.get('/locations', async (req, res) => {
    const locations = await prisma.locations.findMany()
    res.json(locations)
})

router.post('/locations', async (req, res) => {
    const newLocation = await prisma.locations.create({
        data: req.body,
    });
    res.json(newLocation);
})

export default router;