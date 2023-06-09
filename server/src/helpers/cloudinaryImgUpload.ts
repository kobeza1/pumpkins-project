import { v2 as cloudinaryV2 } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs/promises";

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

dotenv.config();

cloudinaryV2.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
});

export const cloudinaryImgUpload = async (file: Express.Multer.File) => {
    const { path: tempUpload } = file;

    try {
        const { secure_url: imageURL, public_id: imageCloudinaryID } =
            await cloudinaryV2.uploader.upload(tempUpload, {
                folder: "images",
                transformation: {
                    gravity: "auto",
                },
            });

        return { imageURL, imageCloudinaryID };
    } catch (error: any) {
        throw new Error(error.message);
    } finally {
        await fs.unlink(tempUpload);
    }
};
