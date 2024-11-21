import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_SECRET) {
    console.error("Missing Cloudinary environment variables.");
    throw new Error("Cloudinary configuration failed. Ensure .env file is set up correctly.");
}

export default cloudinary.v2;
