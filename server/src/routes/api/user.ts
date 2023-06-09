import express from "express";
import { user as ctrl } from "../../controllers/index.js";
import { ctrlWrapper } from "../../helpers/index.js";
import {
    auth,
    upload,
    validation,
    roleMiddleware,
} from "../../middlewares/index.js";
import { userUpdateSchema } from "../../models/user.js";
import { Roles } from "../../models/role.js";

const router = express.Router();

router.get("/currentUser", auth, ctrlWrapper(ctrl.getCurrentUser));

router.patch(
    "/changeData",
    auth,
    roleMiddleware([Roles.Superadmin, Roles.User]),
    upload.single("image"),
    validation(userUpdateSchema),
    ctrlWrapper(ctrl.changeData)
);

export default router;
