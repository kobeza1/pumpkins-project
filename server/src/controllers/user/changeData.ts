import { v2 as cloudinaryV2 } from "cloudinary";
import { Response } from "express";
import { cloudinaryAvatarUpload } from "../../helpers/index.js";
import { RequestWithUser } from "../../middlewares/auth.js";
import { User, UserModel } from "../../models/index.js";

export const changeData = async (req: RequestWithUser, res: Response) => {
    let userAvatarURL = null;
    let userIdCloudAvatar = null;

    if (req.file) {
        const { avatarURL, idCloudAvatar } = await cloudinaryAvatarUpload(
            req.file
        );
        userAvatarURL = avatarURL;
        userIdCloudAvatar = idCloudAvatar;
    }

    const { email, name, phone } = req.body;
    const { _id } = req.user;
    let result: User | null;
    result = await UserModel.findByIdAndUpdate(_id, req.body, { new: true });

    if (userAvatarURL) {
        const user = await UserModel.findOne({ _id });
        if (user.idCloudAvatar) {
            await cloudinaryV2.uploader.destroy(user.idCloudAvatar, {
                // folder: "images",
            });
        }

        result = await UserModel.findByIdAndUpdate(
            _id,
            { avatarURL: userAvatarURL, idCloudAvatar: userIdCloudAvatar },
            { new: true }
        );
    }

    res.status(200).json({
        user: {
            name,
            email,
            phone,
            avatarURL: userAvatarURL,
        },
    });
};
