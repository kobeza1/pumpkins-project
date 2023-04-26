import { HttpError } from "../../helpers/HttpError.js";
import { UserModel } from "../../models/index.js";
import { Request, Response } from "express";

export const verifyEmail = async (req: Request, res: Response) => {
    const { verificationToken } = req.params;
    const user = await UserModel.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404, " Verification token not found");
    }
    await UserModel.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: "",
    });
    res.json({
        message: "Email verify success",
    });
};
