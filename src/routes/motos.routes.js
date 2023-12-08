import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

router.get('/motos', async (req, res) => {
    const motos = await prisma.motos.findMany()
    res.json(motos)
})

router.post('/motos', async (req, res) => {
    const newMoto = await prisma.motos.create({
        data: req.body,
    });
    res.json(newMoto);
})

export default router;