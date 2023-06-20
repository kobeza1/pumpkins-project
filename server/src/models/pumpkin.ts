import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const colors = ["orange", "white", "multicolored", "green"];
const sizes = ["small", "medium", "big"];

export interface Pumpkin {
    _id: string;
    name: string;
    description: string;
    similars: any; // why [] is not compatible?
    color: string;
    size: object;
    price: number;
    favorite: boolean;
    imageURL?: string;
    imageID?: string;
}

const pumpkinSchema = new Schema<Pumpkin>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        description: {
            type: String,
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
            category: {
                type: String,
                enum: {
                    values: sizes,
                    message: "{VALUE} is not supported",
                },
                required: [true, "Size category is required"],
            },
            diameter: {
                type: Number,
            },
            maxweight: {
                type: Number,
            },
            minweight: {
                type: Number,
            },
        },
        price: {
            type: Number,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        imageURL: {
            type: String,
            default: null,
        },
        imageID: {
            type: String,
            default: null,
        },
    },
    { versionKey: false }
);

pumpkinSchema.post("save", handleMongooseError);

export const joiPumpkinSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    similars: Joi.array(),
    color: Joi.string()
        .valid(...colors)
        .required(),
    size: Joi.object({
        category: Joi.string()
            .valid(...sizes)
            .required(),
        diameter: Joi.number(),
        minweight: Joi.number(),
        maxweight: Joi.number(),
    }),
    price: Joi.number(),
    favorite: Joi.boolean(),
});

export const pumpkinFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

export const pumpkinUpdateSchema = Joi.object<Pumpkin>({
    name: Joi.string(),
    description: Joi.string(),
});

export const schemas = {
    joiPumpkinSchema,
    pumpkinFavoriteSchema,
    pumpkinUpdateSchema,
};

export const PumpkinModel = model("pumpkin", pumpkinSchema);
// export const PumpkinModel = model<Pumpkin>("pumpkin", pumpkinSchema);
