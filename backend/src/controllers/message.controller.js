import messageModel from '../models/message.model.js';
import userModel from '../models/user.model.js';
import cloudinary from 'cloudinary';

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user?._id;
        if (!loggedInUserId) {
            return res.status(401).json({ message: "Unauthorized - User not logged in" });
        }

        const filteredUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSideBar:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getMessage = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;
        const message = await messageModel({
            $or:[ 
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId},
                
            ]
        })
        res.status(200).json(message);
    } catch (error) {
        console.error("Error in getMessage:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      let imageUrl;
      if (image) {
        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
  
      await newMessage.save();
  
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };