import { Request, Response } from "express";
import { PumpkinModel } from "../../models/pumpkin.js";
import { HttpError } from "../../helpers/HttpError.js";

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    // const pumpkinById = await PumpkinModel.findById(id);
    const pumpkinById = await PumpkinModel.findOne({ _id: id });

    if (!pumpkinById) {
        throw HttpError(404, "Not found");
    }

    res.json(pumpkinById);
};
