import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/middleware/validation";
import { initCorsMiddleware } from "./lib/middleware/cors";

import animalsRoutes from "./routes/animals"

const app = express();

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/animals", animalsRoutes)

app.use(validationErrorMiddleware);

export default app;
