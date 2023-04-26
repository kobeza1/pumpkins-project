import { UserModel } from "../../models/index.js";
import { sendEmail } from "../../helpers/index.js";
import { Request, Response } from "express";
import { HttpError } from "../../helpers/HttpError.js";
import { MailDataRequired } from "@sendgrid/mail";

export const resendVerifyEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw HttpError(404, " User not found");
    }
    if (user.verify) {
        throw HttpError(400, " User are already verified");
    }
    const mail: MailDataRequired = {
        from: "wildlifepicture@gmail.com",
        to: email,
        subject: " Registration confirmation",
        html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Click for email confirmation</a>`,
    };
    await sendEmail(mail);
    res.json({
        message: "Email verification resent",
    });
};
