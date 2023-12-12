import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()


//OBTENER

router.get('/orders', async (req, res) => {
    const orders = await prisma.orders.findMany()
    res.json(orders)
})

//OBTENER UNICO

router.get('/orders/:id', async (req, res) => {
    try {
        const orderById = await prisma.orders.findFirst({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                $scalars: true,
            }
        });

        return res.json(orderById);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

//CREAR

router.post('/orders', async (req, res) => {
    const newOrder = await prisma.orders.create({
        data: req.body,
    });
    res.json(newOrder);
    
})

//MODIFICAR

router.put('/orders/:id', async (req, res) => {
    try {
        const orderUpdate = await prisma.orders.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });

        return res.json(orderUpdate);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

//ELIMINAR

router.delete('/orders/:id', async (req, res) => {
    try {
        const orderDelete = await prisma.orders.delete({
            where: {
                id: parseInt(req.params.id)
            },
        });

        return res.send(orderDelete);
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;