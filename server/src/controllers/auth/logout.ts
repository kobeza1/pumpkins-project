import { RequestWithUser } from "../../middlewares/auth.js";
import { UserModel } from "../../models/index.js";
import { Response } from "express";

export const logout = async (req: RequestWithUser, res: Response) => {
    const { _id } = req.user;
    await UserModel.findByIdAndUpdate(_id, {
        accessToken: null,
        refreshToken: null,
    });
    res.status(204).json();
};
