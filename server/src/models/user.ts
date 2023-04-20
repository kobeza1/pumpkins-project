const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
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

const joiRegisterSchema = Joi.object({
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

const joiLoginSchema = Joi.object({
    email: Joi.string().min(7).max(63).email().required(),
    password: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().min(7).max(63).email(),
    phone: Joi.string()
        .length(13)
        .pattern(/^\+[380]{3}\d{7}/),
    password: Joi.string().trim(true).min(7).max(32).pattern(/^\S*$/),
});

const User = model("user", userSchema);

module.exports = {
    User,
    joiRegisterSchema,
    joiLoginSchema,
    userUpdateSchema,
};
