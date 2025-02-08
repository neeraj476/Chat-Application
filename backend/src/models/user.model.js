import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    profilePic: { type: String, default: "" }
}, { timestamps: true }); // Fixed timestamps key

export default mongoose.model("User", userSchema); // Removed 'new' from model instantiation
