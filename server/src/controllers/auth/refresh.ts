import { UserModel } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Request, Response } from "express";

config();

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

export const refresh = async (req: Request, res: Response) => {
    const { refreshToken: token } = req.body;
    try {
        const { id } = jwt.verify(token, REFRESH_SECRET_KEY) as jwt.JwtPayload;
        const isExist = await UserModel.findOne({ refreshToken: token });
        if (!isExist) {
            throw HttpError(403, "Invalid token");
        }
        const payload = {
            id,
        };

        const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
            expiresIn: "3m",
        });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
            expiresIn: "7d",
        });
        res.json({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        throw HttpError(403, error.message);
    }
};
