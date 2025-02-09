import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
import { connectTODB } from "./lib/db.js";
import userRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();

// CORS Configuration
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware
app.use(express.json({ limit: "10mb" }));  // Set JSON limit only once
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoutes);

// Start Server After DB Connection
const port = process.env.PORT || 3000;
(async () => {
    try {
        await connectTODB();
        console.log("✅ Database connected successfully.");
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("❌ Database connection failed. Server not started.");
        process.exit(1); // Exit process if DB connection fails
    }
})();
