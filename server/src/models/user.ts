import Joi from "joi";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Set password for user"],
        },
        name: {
            type: String,
            required: [true, "Username is required"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
            required: true,
        },
        idCloudAvatar: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
);

export interface User {
    _id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    token?: string;
    idCloudAvatar?: string;
}

interface UserLogin extends Pick<User, "email" | "password"> {}

export const joiRegisterSchema = Joi.object<User>({
    email: Joi.string().min(7).max(63).email().required(),
    password: Joi.string()
        .trim(true)
        .min(7)
        .max(32)
        .pattern(/^\S*$/)
        .required(),
    name: Joi.string().alphanum().required(),
    phone: Joi.string()
        .length(13)
        .pattern(/^\+[380]{3}\d{7}/)
        .required(),
});

export const joiLoginSchema = Joi.object<UserLogin>({
    email: Joi.string().min(7).max(63).email().required(),
    password: Joi.string().required(),
});

export const userUpdateSchema = Joi.object<User>({
    name: Joi.string(),
    email: Joi.string().min(7).max(63).email(),
    phone: Joi.string()
        .length(13)
        .pattern(/^\+[380]{3}\d{7}/),
    password: Joi.string().trim(true).min(7).max(32).pattern(/^\S*$/),
});

export const UserModel = model<User>("user", userSchema);
