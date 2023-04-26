import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../../helpers/index.js";
import { UserModel } from "../../models/index.js";

config();

const { SECRET_KEY } = process.env;

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw HttpError(409, "There is no user with such date");
    }
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
        throw HttpError(401, "Password is wrong");
    }
    if (!user.verify) {
        throw HttpError(403, " Email is not verified");
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await UserModel.findByIdAndUpdate(user._id, { token });

    res.json({
        status: "success",
        code: 200,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
};
