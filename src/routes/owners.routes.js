import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

//OBTENER
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

//OBTENER UNICO
router.get('/owners/:id', async (req, res) => {
    try {
        const ownerByID = await prisma.owners.findFirst({
            where: {
                id_dni: parseInt(req.params.id)
            },
            include: {
                category: true,
            }
        });

        // Convertir BigInt a String directamente en el objeto
        const ownerStrings = {
            ...ownerByID,
            phone: String(ownerByID.phone),
            // Otros campos de BigInt también pueden necesitar conversión
        };

        return res.json(ownerStrings);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//CREAR
router.post('/owners', async (req, res) => {
    try {
        // Convertir el campo phone (BigInt) a cadena antes de crear el nuevo propietario
        const requestData = {
            ...req.body,
            phone: req.body.phone.toString(), // Convertir el campo phone a cadena
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


//MODIFICAR

router.put('/owners/:id', async (req, res) => {
    try {
        const ownerUpdate = await prisma.owners.update({
            where: {
                id_dni: parseInt(req.params.id)
            },
            data: req.body
        });

        // Convertir BigInt a String directamente en el objeto
        const ownerUStrings = {
            ...ownerUpdate,
            phone: String(ownerUpdate.phone),
        };

        return res.json(ownerUStrings);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

//ELIMINAR

router.delete('/owners/:id', async (req, res) => {
    try {
        const ownerDelete = await prisma.owners.delete({
            where: {
                id_dni: parseInt(req.params.id)
            }
        });

        // Convertir BigInt a String directamente en el objeto
        const ownerDStrings = {
            ...ownerDelete,
            phone: String(ownerDelete.phone),
            // Otros campos de BigInt también pueden necesitar conversión
        };

        return res.send(ownerDStrings);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



export default router;






