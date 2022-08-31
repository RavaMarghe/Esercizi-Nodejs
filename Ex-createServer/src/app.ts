import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";
import {
    validate,
    validationErrorMiddleware,
    animalSchema,
    AnimalData,
} from "./lib/validation";

const app = express();

app.use(express.json());

app.get("/animals", async (request, response) => {
    const animals = await prisma.animal.findMany();

    response.json(animals);
});

app.post(
    "/animals",
    validate({ body: animalSchema }),
    async (request, response) => {
        const animal: AnimalData = request.body;

        response.status(201).json(animal);
    }
);

app.use(validationErrorMiddleware)

export default app;
