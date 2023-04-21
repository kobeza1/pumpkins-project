import { connectMongo } from "./db/connection.js";

connectMongo()
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((e: { message: String }) => {
        console.log(e.message);
        process.exit(1);
    });
