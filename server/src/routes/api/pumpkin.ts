import express from "express";
import { ctrlWrapper } from "../../helpers/index.js";
import { pumpkin as ctrl } from "../../controllers/index.js";
import { addPumpkin } from "../../controllers/pumpkin/addPumpkin.js";

const router = express.Router();

router.get("/", ctrlWrapper(addPumpkin));


export default router;
