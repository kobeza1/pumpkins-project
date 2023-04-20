import bodyParser from "body-parser"; // TODO: remove ?
import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import logger from "morgan";
import { authRouter, userRouter } from "./routes/api/index.js";

import "./server.js";

config();

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(bodyParser.json());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Hello World!" });
});
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((_req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err: any, _req: Request, res: Response) => {
    const { status = 500 } = err;
    res.status(status).json({ message: err.message });
});

export { app };
