import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()


//OBTENER

router.get('/motos', async (req, res) => {
    const motos = await prisma.motos.findMany()
    res.json(motos)
})

//CREAR

router.post('/motos', async (req, res) => {
    const newMoto = await prisma.motos.create({
        data: req.body,
    });
    res.json(newMoto);
})

//MODIFICAR

router.put('/motos/:id', async (req, res) => {
    try {
        const motoUpdate = await prisma.motos.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });

        return res.json(motoUpdate);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


export default router;