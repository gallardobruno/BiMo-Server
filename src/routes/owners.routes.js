import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

router.get('/owners', async (req, res) => {
    try {
        const owners = await prisma.owners.findMany();
        // Convertir el campo phone (BigInt) a cadena antes de enviar la respuesta JSON
        const ownersWithStrings = owners.map(owner => {
            return {
                ...owner,
                phone: owner.phone.toString(), // Convertir el campo phone a cadena
            };
        });
        res.json(ownersWithStrings);
    } catch (error) {
        console.error("Error fetching owners:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/owners', async (req, res) => {
    try {
        // Convertir el campo phone (BigInt) a cadena antes de crear el nuevo propietario
        const requestData = {
            ...req.body,
            phone: req.body.phone.toString(), // Convertir el campo phone a cadena
            // Puedes agregar más campos BigInt aquí si es necesario
        };

        const newOwner = await prisma.owners.create({
            data: requestData,
        });

        res.json(newOwner);
    } catch (error) {
        console.error("Error creating owner:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;






