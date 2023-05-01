import { Request, Response } from "express";
import { PumpkinModel } from "../../models/pumpkin.js";
import { HttpError } from "../../helpers/HttpError.js";

export const deletePumpkin = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PumpkinModel.findByIdAndDelete(id);

    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
};
