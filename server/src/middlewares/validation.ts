import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { HttpError } from "../helpers/index.js";

export const validation = (schema: Schema) => {
    const func = (req: Request, _res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);

        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    };
    return func;
};
