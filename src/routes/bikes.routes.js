import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

//OBTENER
router.get('/bikes', async (req, res) => {
    const bikes = await prisma.bikes.findMany()
    res.json(bikes)
})

//OBTENER UNICO


//CREAR
router.post('/bikes', async (req, res) => {
    const newBike = await prisma.bikes.create({
        data: req.body,
    });
    res.json(newBike);
})

//MODIFICAR

router.put('/bikes/:id', async (req, res) => {
    try {
        const bikeUpdate = await prisma.bikes.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });

        return res.json(bikeUpdate);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export default router;