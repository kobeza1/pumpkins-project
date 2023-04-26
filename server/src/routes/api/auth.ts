import express from "express";
import { auth as ctrl } from "../../controllers/index.js";
import { ctrlWrapper } from "../../helpers/index.js";
import { auth, validation } from "../../middlewares/index.js";
import {
    joiLoginSchema,
    joiRegisterSchema,
    joiVerifyEmailSchema,
    joiRefreshSchema,
} from "../../models/user.js";

const router = express.Router();

router.post(
    "/register",
    validation(joiRegisterSchema),
    ctrlWrapper(ctrl.register)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
    "/verify",
    validation(joiVerifyEmailSchema),
    ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post(
    "/refresh",
    validation(joiRefreshSchema),
    ctrlWrapper(ctrl.refresh)
);

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

export default router;
