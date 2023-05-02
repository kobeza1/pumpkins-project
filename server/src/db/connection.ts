import mongoose from "mongoose";

async function connectMongo(): Promise<typeof mongoose> {
    try {
        const connection = await mongoose.connect(process.env.DB_HOST);
        console.log("Database connection successful");
        return connection;
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}

export const connection = await connectMongo();
