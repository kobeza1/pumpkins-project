import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import { User, UserModel } from "../models/index.js";

config();

const { SECRET_KEY } = process.env;

export interface RequestWithUser extends Request {
    user: User;
}

export const auth = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"));
    }
    if (!token) {
        next(HttpError(401, "Not authorized"));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

        const user = await UserModel.findById(id);

        if (!user || !user.token) {
            next(HttpError(401, "Not authorized"));
        }
        req.user = user;

        next();
    } catch (error: any) {
        if ((error.message = "Invalid signature")) {
            error.status = 401;
        }
        next(error);
    }
};
