import Joi from "joi";
import { Schema, model } from "mongoose";

const pumpkinSchema = new Schema({
    name: String,
    price: Number,
})

export const PumpkinModel = model("pumpkin", pumpkinSchema);


