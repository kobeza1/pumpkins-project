import express from "express";
import { ctrlWrapper } from "../../helpers/index.js";
import { isValidId, validation } from "../../middlewares/index.js";
import { pumpkin as ctrl } from "../../controllers/index.js";
import { schemas } from "../../models/pumpkin.js";

const router = express.Router();

router.get("/", validation(schemas.joiPumpkinSchema), ctrlWrapper(ctrl.getAll));

router.post("/", ctrlWrapper(ctrl.addPumpkin));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.put(
    "/:id",
    isValidId,
    validation(schemas.joiPumpkinSchema),
    ctrlWrapper(ctrl.updateById)
);

router.patch(
    "/:id/favorite",
    isValidId,
    validation(schemas.pumpkinFavoriteSchema),
    ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.deletePumpkin));

export default router;
