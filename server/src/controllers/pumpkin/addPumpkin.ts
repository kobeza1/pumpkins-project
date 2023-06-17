import { Request, Response } from "express";
import { PumpkinModel } from "../../models/pumpkin.js";
import { cloudinaryImgUpload } from "../../helpers/index.js";
import { HttpError } from "../../helpers/HttpError.js";

export const addPumpkin = async (req: Request, res: Response) => {
    let pumpkinURL = null;
    let pumpkinCloudinaryID = null;

    const { imageURL, imageCloudinaryID } = await cloudinaryImgUpload(req.file);
    const { name } = req.body;
    const check = await PumpkinModel.findOne({ name: name });

    if (check!) {
        throw HttpError(409, " This pumpkin is already added!");
    }

    const result = await PumpkinModel.create({
        ...req.body,
        pumpkinURL: imageURL,
        pumpkinCloudinaryID: imageCloudinaryID,
    });

    res.status(201).json({
        status: "success",
        code: 201,
        message: `pumpkin added`,
        data: { result },
    });
};
