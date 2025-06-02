// config/multer.js
import multer from "multer";

const storage = multer.memoryStorage(); // Store in memory to pipe to Cloudinary
const upload = multer({ storage });

export default upload;
