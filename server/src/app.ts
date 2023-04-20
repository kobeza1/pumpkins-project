import express from "express";
import bodyParser from "body-parser";

const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { authRouter, userRouter } = require("./routes/api");

const app = express();
app.use(bodyParser.json());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use(
    (
        err: { status: Number; message: String },
        req: {},
        res: { status: any },
        next: any
    ) => {
        const { status = 500 } = err;
        res.status(status).json({ message: err.message });
    }
);

module.exports = app;
