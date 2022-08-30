import express from "express";
import "express-async-errors";

const app = express();

app.get("/animals", (request, response) => {
    response.json([{ breed: "Penguin" }, { breed: "Bear" }]);
});

export default app;
