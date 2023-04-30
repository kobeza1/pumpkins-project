import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const colors = ["orange", "white", "multicolor", "green"];
const sizes = ["small", "medium", "big"];

const pumpkinSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        similars: {
            type: Array,
            default: [],
        },
        color: {
            type: String,
            enum: {
                values: colors,
                message: "{VALUE} is not supported",
            },
            required: [true, "Color is required"],
        },
        size: {
            type: String,
            enum: {
                values: sizes,
                message: "{VALUE} is not supported",
            },
            required: [true, "Size is required"],
        },
        price: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);

pumpkinSchema.post("save", handleMongooseError);

export const joiPumpkinSchema = Joi.object({
    name: Joi.string().required(),
    similars: Joi.array(),
    color: Joi.string()
        .valid(...colors)
        .required(),
    size: Joi.string()
        .valid(...sizes)
        .required(),
    price: Joi.string(),
    favorite: Joi.boolean(),
});

export const pumpkinFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

export const schemas = {
    joiPumpkinSchema,
    pumpkinFavoriteSchema,
};

export const PumpkinModel = model("pumpkin", pumpkinSchema);
