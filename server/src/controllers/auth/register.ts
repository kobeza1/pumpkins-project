import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { Request, Response } from "express";
import gravatar from "gravatar";
import { HttpError } from "../../helpers/index.js";
import { UserModel } from "../../models/index.js";

config();

export const register = async (req: Request, res: Response) => {
    const { password, email, name, phone } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
        throw HttpError(409, "Provided email already exists");
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);

    const newUser = await UserModel.create({
        password: hashPassword,
        email,
        name,
        phone,
        avatarURL,
    });

    res.json({
        status: 201,
        user: {
            id: newUser._id,
            email,
            name,
            avatarURL,
        },
    });
};
