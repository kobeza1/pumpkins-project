import { v2 as cloudinaryV2 } from "cloudinary";
import { Response, Request } from "express";
import { cloudinaryImgUpload } from "../../helpers/index.js";
import { Pumpkin, PumpkinModel } from "../../models/pumpkin.js";

// export interface RequestWithPumpkin extends Request {
//     pumpkin: Pumpkin;
// }

export const editPumpkin = async (req: Request, res: Response) => {
    let url = null;
    let imageID = null;

    if (req.file) {
        const { imageURL, imageCloudinaryID } = await cloudinaryImgUpload(
            req.file
        );
        url = imageURL;
        imageID = imageCloudinaryID;
    }

    // console.log("req params", req.params);

    const { name, description } = req.body;
    const { id } = req.params;
    let result: Pumpkin | null;
    result = await PumpkinModel.findByIdAndUpdate(id, req.body, { new: true });

    // console.log("result", result);

    if (url) {
        const pumpkin = await PumpkinModel.findOne({ _id: id });
        // console.log("pumpkin", pumpkin);

        if (pumpkin.imageID) {
            await cloudinaryV2.uploader.destroy(pumpkin.imageID, {
                // folder: "images",
            });
        }

        result = await PumpkinModel.findByIdAndUpdate(
            id,
            { imageURL: url, imageID: imageID },
            { new: true }
        );
    }

    res.status(200).json({
        user: {
            name,
            description,
            imageURL: url,
        },
    });
};
