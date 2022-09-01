import express from "express";
import "express-async-errors";
import cors from "cors";
import prisma from "./lib/prisma/client";
import {
    validate,
    validationErrorMiddleware,
    animalSchema,
    AnimalData,
} from "./lib/validation";
import { initMulterMiddleware } from "./lib/middleware/multer";

const upload = initMulterMiddleware();

const corsOptions = {
    origin: "http://localhost:8080",
};

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.get("/animals", async (request, response) => {
    const animals = await prisma.animal.findMany();

    response.json(animals);
});

app.get("/animals/:id(\\d+)", async (request, response, next) => {
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

app.post(
    "/animals",
    validate({ body: animalSchema }),
    async (request, response) => {
        const animalData: AnimalData = request.body;

        const animal = await prisma.animal.create({
            data: animalData,
        });

        response.status(201).json(animal);
    }
);

app.put(
    "/animals/:id(\\d+)",
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

app.delete("/animals/:id(\\d+)", async (request, response, next) => {
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

app.post(
    "/animals/:id(\\d+)/photo",
    upload.single("photo"),
    async (request, response, next) => {
        console.log("request.file", request.file);

        if (!request.file) {
            response.status(400);
            return next("No photo file uploaded.");
        }

        const photoFilename = request.file.filename;

        response.status(201).json({ photoFilename });
    }
);

app.use(validationErrorMiddleware);

export default app;
