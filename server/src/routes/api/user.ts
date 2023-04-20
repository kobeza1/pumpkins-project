const express = require("express");
const router = express.Router();

const { user: ctrl } = require("../../controllers");

const { validation, auth, upload } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { userUpdateSchema } = require("../../models/user");

router.get("/currentUser", auth, ctrlWrapper(ctrl.getCurrentUser));
router.get("/userData", auth, ctrlWrapper(ctrl.getUserData));

router.patch(
    "/changeData",
    auth,
    upload.single("image"),
    validation(userUpdateSchema),
    ctrlWrapper(ctrl.changeData)
);

module.exports = router;
