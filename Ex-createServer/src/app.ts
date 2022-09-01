import express from "express";
import "express-async-errors";
import cors from "cors";

import { validationErrorMiddleware } from "./lib/validation";

import animalsRoutes from "./routes/animals"

const corsOptions = {
    origin: "http://localhost:8080",
};

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use("/animals", animalsRoutes)

app.use(validationErrorMiddleware);

export default app;
