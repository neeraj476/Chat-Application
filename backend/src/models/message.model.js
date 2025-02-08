import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Sender ID
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Receiver ID
    text: { type: String }, // Message text
    image: { type: String, default: "" }, // Optional image URL
    // isRead: { type: Boolean, default: false } // Read status
}, { timestamps: true }); // Adds createdAt & updatedAt fields

export default mongoose.model("Message", messageSchema);
