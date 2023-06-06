import { Schema, model } from "mongoose";

export enum Roles {
    Superadmin = "SUPERADMIN",
    Admin = "ADMIN",
    User = "USER",
}
const roleSchema = new Schema(
    {
        value: {
            type: String,
            unique: true,
            default: Roles.User,
        },
    },
    { versionKey: false, timestamps: true }
);

export const RoleModel = model("role", roleSchema);
