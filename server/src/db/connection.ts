import mongoose from "mongoose";

export function connectMongo() {
    return mongoose.connect(process.env.DB_HOST);
}
