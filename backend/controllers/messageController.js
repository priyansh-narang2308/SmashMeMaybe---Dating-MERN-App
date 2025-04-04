import Message from "../models/Message.js";
import { getIO, getConnectedUsers } from "../socket/socket.server.js";

export const sendMessage = async (req, res) => {
    try {

        const { content, receiverId } = req.body;

        const newMessage = await Message.create({
            sender: req.user.id,
            receiver: receiverId,
            content
        });

        // TODO:SEND MESAGE USING SOCKET IO

        const io = getIO();
        const connectedUsers = getConnectedUsers();
        const recieverScketId = connectedUsers.get(receiverId);

        if (recieverScketId) {
            io.to(recieverScketId).emit("newMessage", {
                message: newMessage
            });
        }

        res.status(200).json({
            success: true,
            message: newMessage
        });

    } catch (error) {
        console.log("Error in sending Message : ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const getConversationMessages = async (req, res) => {

    const { userId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                {
                    sender: req.user._id,
                    receiver: userId
                },
                // or vic versqa 
                {
                    sender: userId,
                    receiver: req.user._id
                }
            ]
        }).sort("createdAt");

        res.status(200).json({
            success: true,
            messages
        });
    } catch (error) {
        console.log("Error in getting Messages : ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};