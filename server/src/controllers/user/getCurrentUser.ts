import { Response } from "express";
import { RequestWithUser } from "../../middlewares/auth.js";

export const getCurrentUser = (req: RequestWithUser, res: Response) => {
    const { _id: id, name, email } = req.user;

    res.json({
        user: {
            id,
            name,
            email,
        },
    });
};
