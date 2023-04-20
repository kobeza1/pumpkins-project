import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export function connectMongo() {
    return mongoose.connect(process.env.DB_HOST);
}
