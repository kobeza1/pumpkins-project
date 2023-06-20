import express from "express";
import { ctrlWrapper } from "../../helpers/index.js";
import { isValidId, upload, validation } from "../../middlewares/index.js";
import { pumpkin as ctrl } from "../../controllers/index.js";
import { schemas } from "../../models/pumpkin.js";

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.post("/", upload.single("imageURL"), ctrlWrapper(ctrl.addPumpkin));

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

router.patch(
    "/:id/edit",
    upload.single("imageURL"),
    validation(schemas.pumpkinUpdateSchema),
    ctrlWrapper(ctrl.editPumpkin)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.deletePumpkin));

export default router;
