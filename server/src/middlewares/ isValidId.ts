import { isValidObjectId } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../helpers/HttpError.js";

export const isValidId = (req: Request, _res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        next(HttpError(400, `${id} is not valid id`));
    }
    next();
};
