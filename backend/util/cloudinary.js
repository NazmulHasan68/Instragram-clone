import cloudinary from "cloudinary";
import dotenv from "dotenv";

// Load environment variables early
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

// Validate Cloudinary credentials
if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_SECRET) {
    console.error("Cloudinary environment variables are missing or invalid.");
    throw new Error("Cloudinary configuration failed.");
}

export default cloudinary.v2;


