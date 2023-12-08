import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

router.get('/prospects', async (req, res) => {
    try {
        const prospects = await prisma.prospects.findMany();
        // Convertir el campo phone (BigInt) a cadena antes de enviar la respuesta JSON
        const prospectStrings = prospects.map(prospect => {
            return {
                ...prospect,
                phone: prospect.phone.toString(), // Convertir el campo phone a cadena
            };
        });
        res.json(prospectStrings);
    } catch (error) {
        console.error("Error fetching owners:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/prospects', async (req, res) => {
    try {
        // Convertir el campo phone (BigInt) a cadena antes de crear el nuevo propietario
        const requestData = {
            ...req.body,
            phone: req.body.phone.toString(), // Convertir el campo phone a cadena
            // Puedes agregar más campos BigInt aquí si es necesario
        };
        const newProspect = await prisma.prospects.create({
            data: requestData,
        });
        res.json(newProspect);
    } catch (error) {
        console.error("Error creating owner:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;