import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config(); // Load environment variables

// Ensure all required environment variables are present
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("❌ Cloudinary configuration error: Missing environment variables.");
    process.exit(1); // Exit process to prevent further issues
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // ✅ Fixed typo
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("✅ Cloudinary configured successfully.");

export default cloudinary;
