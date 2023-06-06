import { Schema, model } from "mongoose";

const roleSchema = new Schema(
    {
        value: {
            type: String,
            unique: true,
            default: "USER",
        },
    },
    { versionKey: false, timestamps: true }
);

export const RoleModel = model("role", roleSchema);
