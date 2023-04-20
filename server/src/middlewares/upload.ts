import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req: {}, file: { originalname: String }, cb: Function) => {
        cb(null, file.originalname);
    },
    // limits: {
    //     fileSize: 2048,
    // },
});

export const upload = multer({
    storage: multerConfig,
});
