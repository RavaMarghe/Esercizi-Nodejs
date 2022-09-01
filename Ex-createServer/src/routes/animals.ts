import express, { Router } from "express";
import prisma from "../lib/prisma/client";
import { validate, animalSchema, AnimalData } from "../lib/middleware/validation";
import { initMulterMiddleware } from "../lib/middleware/multer";

const upload = initMulterMiddleware();

const router = Router();

router.get("/", async (request, response) => {
    const animals = await prisma.animal.findMany();

    response.json(animals);
});

router.get("/:id(\\d+)", async (request, response, next) => {
    const animalID = Number(request.params.id);

    const animal = await prisma.animal.findUnique({
        where: { id: animalID },
    });

    if (!animal) {
        response.status(404);
        return next(`Cannot GET /animals/${animalID}`);
    }

    response.json(animal);
});

router.post(
    "/",
    validate({ body: animalSchema }),
    async (request, response) => {
        const animalData: AnimalData = request.body;

        const animal = await prisma.animal.create({
            data: animalData,
        });

        response.status(201).json(animal);
    }
);

router.put(
    "/:id(\\d+)",
    validate({ body: animalSchema }),
    async (request, response, next) => {
        const animalId = Number(request.params.id);
        const animalData: AnimalData = request.body;

        try {
            const animal = await prisma.animal.update({
                where: { id: animalId },
                data: animalData,
            });

            response.status(200).json(animal);
        } catch (error) {
            response.status(404);
            next(`Cannot PUT /animals/${animalId}`);
        }
    }
);

router.delete("/:id(\\d+)", async (request, response, next) => {
    const animalId = Number(request.params.id);

    try {
        await prisma.animal.delete({
            where: { id: animalId },
        });

        response.status(204).end();
    } catch (error) {
        response.status(404);
        next(`Cannot DELETE /animals/${animalId}`);
    }
});

router.post(
    "/:id(\\d+)/photo",
    upload.single("photo"),
    async (request, response, next) => {
        if (!request.file) {
            response.status(400);
            return next("No photo file uploaded.");
        }

        const animalId = Number(request.params.id);
        const photoFilename = request.file.filename;

        try {
            await prisma.animal.update({
                where: { id: animalId },
                data: { photoFilename },
            });
            response.status(201).json({ photoFilename });
        } catch (error) {
            response.status(404);
            next(`Cannot POST /animals/${animalId}/photo`);
        }
    }
);

router.use("/photos", express.static("uploads"));

export default router;
