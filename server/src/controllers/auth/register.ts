import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { Request, Response } from "express";
import gravatar from "gravatar";
import { HttpError } from "../../helpers/index.js";
import { RoleModel, UserModel } from "../../models/index.js";

import { sendEmail } from "../../helpers/index.js";
import { v4 } from "uuid";
import { MailDataRequired } from "@sendgrid/mail";

config();

export const register = async (req: Request, res: Response) => {
    // const userRole = new RoleModel();
    // const adminRole = new RoleModel({ value: "ADMIN" });
    // const superAdminRole = new RoleModel({ value: "SUPERADMIN" });
    // await userRole.save();
    // await adminRole.save();
    // await superAdminRole.save();
    const { password, email, name, phone } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        throw HttpError(409, "Provided email already exists");
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);
    const verificationToken = v4();
    const userRole = await RoleModel.findOne({ value: "USER" });
    const newUser = await UserModel.create({
        password: hashPassword,
        email,
        name,
        phone,
        avatarURL,
        verificationToken,
        roles: [userRole.value],
    });
    const mail: MailDataRequired = {
        from: "wildlifepicture@gmail.com",
        to: email,
        subject: " Registration confirmation",
        html: `<a href="http://localhost:3000/auth/verify/${verificationToken}" target="_blank">Click for email confirmation</a>`,
    };
    await sendEmail(mail);
    res.json({
        status: 201,
        user: {
            id: newUser._id,
            email,
            name,
            avatarURL,
            roles: userRole.value,
        },
    });
};
