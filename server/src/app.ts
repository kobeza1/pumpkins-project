import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import { authRouter, userRouter, pumpkinRouter } from "./routes/api/index.js";

import "./db/connection.js";

config();

const { PORT = 3000 } = process.env;

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Hello World!" });
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/pumpkin", pumpkinRouter);


app.use((_req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const { status = 500 } = err;
    res.status(status).json({ message: err.message });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export { app };
