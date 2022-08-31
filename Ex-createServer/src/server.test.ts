import supertest from "supertest";
import { prismaMock } from "./lib/prisma/client.mock";
import app from "./app";

const request = supertest(app);

describe("GET /animals", () => {
    test("Valid request", async () => {
        const animals = [
            {
                id: 1,
                breed: "Penguin",
                weight: 35,
                name: null,
                createdAt: "2022-08-31T11:19:56.696Z",
                updatedAt: "2022-08-31T11:18:58.029Z",
            },
        ];

        // @ts-ignore
        prismaMock.animal.findMany.mockResolvedValue(animals);

        const response = await request
            .get("/animals")
            .expect(200)
            .expect("Content-type", /application\/json/);
        expect(response.body).toEqual(animals);
    });
});

describe("POST /animals", () => {
    test("Valid request", async () => {
        const animal = [
            {
                breed: "Snake",
                weight: 20,
            },
        ];

        const response = await request
            .post("/animals")
            .send(animal)
            .expect(201)
            .expect("Content-type", /application\/json/);
        expect(response.body).toEqual(animal);
    });

    test("Invalid request", async () => {
        const animal = [
            {
                breed: "Snake",
            },
        ];

        const response = await request
            .post("/animals")
            .send(animal)
            .expect(422)
            .expect("Content-type", /application\/json/);
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});
