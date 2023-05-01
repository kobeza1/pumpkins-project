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
    if (file) {
        const { path: tempUpload } = file;

        try {
            const { secure_url: avatarURL, public_id: idCloudAvatar } =
                await cloudinaryV2.uploader.upload(tempUpload, {
                    folder: "images",
                    transformation: {
                        with: 288,
                        height: 288,
                        gravity: "auto",
                        crop: "fill",
                    },
                });

            return { avatarURL, idCloudAvatar };
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            await fs.unlink(tempUpload);
        }
    }
};
