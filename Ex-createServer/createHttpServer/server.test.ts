import supertest from "supertest";
import app from "./app"
const request = supertest(app)

test("GET /animals", async () => {
    const response = await request
        .get("/animals")
        .expect(200)
        .expect("Content-type", /application\/json/)
    expect(response.body).toEqual([{ breed: "Penguin" }, { breed: "Bear" }])
})
