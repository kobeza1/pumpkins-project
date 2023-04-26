import { config } from "dotenv";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (data: MailDataRequired) => {
    try {
        const email: MailDataRequired = {
            ...data,
        };
        await sgMail.send(email).then(
            () => {},
            (error) => {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body);
                }
            }
        );
        return true;
    } catch (error) {
        throw error;
    }
};
