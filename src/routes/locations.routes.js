import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()


//OBTENER

router.get('/locations', async (req, res) => {
    const locations = await prisma.locations.findMany()
    res.json(locations)
})

//CREAR

router.post('/locations', async (req, res) => {
    const newLocation = await prisma.locations.create({
        data: req.body,
    });
    res.json(newLocation);
})

//MODIFICAR

router.put('/locations/:id', async (req, res) => {
    try {
        const locationUpdate = await prisma.locations.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });

        return res.json(locationUpdate);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export default router;