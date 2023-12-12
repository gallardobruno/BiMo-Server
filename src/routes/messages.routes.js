import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

//OBTENER

router.get('/messages', async (req, res) => {
    const messages = await prisma.messages.findMany()
    res.json(messages)
})

//OBTENER UNICO

router.get('/messages/:id', async (req, res) => {
    try {
        const messageById = await prisma.messages.findFirst({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                $scalars: true,
            }
        });

        return res.json(messageById);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

//CREAR

router.post('/messages', async (req, res) => {
    const newMessage = await prisma.messages.create({
        data: req.body,
    });
    res.json(newMessage);
})

//MODIFICAR

router.put('/messages/:id', async (req, res) => {
    try {
        const messageUpdate = await prisma.messages.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });

        return res.json(messageUpdate);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

//ELIMINAR

router.delete('/messages/:id', async (req, res) => {
    try {
        const messageDelete = await prisma.messages.delete({
            where: {
                id: parseInt(req.params.id)
            },
        });

        return res.send(messageDelete);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;