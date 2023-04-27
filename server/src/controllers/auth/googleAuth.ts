import { Response } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../../middlewares/auth.js";
import { config } from "dotenv";
import { UserModel } from "../../models/user.js";

config();

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, FRONTEND_URL } = process.env;

export const googleAuth = async (req: RequestWithUser, res: Response) => {
    const { _id: id } = req.user;
    const payload = {
        id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
        expiresIn: "3m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
        expiresIn: "7d",
    });
    await UserModel.findByIdAndUpdate(id, { accessToken, refreshToken });

    res.redirect(
        `${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
};
