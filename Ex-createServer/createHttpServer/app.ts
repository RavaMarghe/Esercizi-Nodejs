import express from "express";
import "express-async-errors";

const app = express();

app.get("/numbers", (request, response) => {
    response.json([{ numbers: 12 }, { numbers: 73 }]);
});

export default app;
