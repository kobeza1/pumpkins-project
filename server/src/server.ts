import { app } from "./app.js";
import { connectMongo } from "./db/connection.js";

const { PORT = 3000 } = process.env;

connectMongo()
    .then(() => {
        console.log("Database connection successful");

        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    })
    .catch((e: { message: String }) => {
        console.log(e.message);
        process.exit(1);
    });
