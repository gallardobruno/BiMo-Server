import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()


//OBTENER 

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

//OBTENER UNICO


router.get('/prospects/:id', async (req, res) => {
    try {
        const prospectByID = await prisma.prospects.findFirst({
            where: {
                id_dni: parseInt(req.params.id)
            },
            include: {
                $scalars: true,
            }
        });

        // Convertir BigInt a String directamente en el objeto
        const prospectStrings = {
            ...prospectByID,
            phone: String(prospectByID.phone),
            // Otros campos de BigInt también pueden necesitar conversión
        };

        return res.json(prospectStrings);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// CREAR

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


//MODIFICAR

router.put('/prospects/:id', async (req, res) => {
    try {
        const prospectUpdate = await prisma.prospects.update({
            where: {
                id_dni: parseInt(req.params.id)
            },
            data: req.body
        });

        // Convertir BigInt a String directamente en el objeto
        const prospectUStrings = {
            ...prospectUpdate,
            phone: String(prospectUpdate.phone),
        };

        return res.json(prospectUStrings);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

//ELIMINAR

router.delete('/prospects/:id', async (req, res) => {
    try {
        const prospectDelete = await prisma.prospects.delete({
            where: {
                id_dni: parseInt(req.params.id)
            }
        });

        // Convertir BigInt a String directamente en el objeto
        const prospectDStrings = {
            ...prospectDelete,
            phone: String(prospectDelete.phone),
            // Otros campos de BigInt también pueden necesitar conversión
        };

        return res.send(prospectDStrings);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;