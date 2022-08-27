import supertest from "supertest";
import app from "./app"
const request = supertest(app)

test("GET /numbers", async () => {
    const response = await request
        .get("/numbers")
        .expect(200)
        .expect("Content-type", /application\/json/)
    expect(response.body).toEqual([{ numbers: 12 }, { numbers: 73 }])
})
