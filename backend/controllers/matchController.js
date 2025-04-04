import User from "../models/User.js";
import { getConnectedUsers, getIO } from "../socket/socket.server.js";


export const swipeRight = async (req, res) => {
    try {
        const { likedUserId } = req.params;
        const currUser = await User.findById(req.user.id);
        const likedUser = await User.findById(likedUserId);

        if (!likedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        if (!currUser.likes.includes(likedUserId)) {
            currUser.likes.push(likedUserId);
            await currUser.save();

            // if the other user already liked us, it's a match, so let's update both users
            if (likedUser.likes.includes(currUser.id)) {
                currUser.matches.push(likedUserId);
                likedUser.matches.push(currUser.id);

                await Promise.all([await currUser.save(), await likedUser.save()]);
            }

            // TODO:SEND NOTIFCIATION USING SOCKET IO

            // send the notif to the user

            const connectedUsers = getConnectedUsers();
            const io = getIO();

            // give the socket id of the User
            const likedUserSocketId = connectedUsers.get(likedUserId);

            if (likedUserSocketId) {
                io.to(likedUserSocketId).emit("newMatch", {
                    _id: currUser._id,
                    name: currUser.name,
                    image: currUser.image,
                });
            }

            const currentSocketId = connectedUsers.get(currUser._id.toString());
            if (currentSocketId) {
                io.to(currentSocketId).emit("newMatch", {
                    _id: likedUser._id,
                    name: likedUser.name,
                    image: likedUser.image,
                });
            }
        }

        res.status(200).json({
            success: true,
            user: currUser,
        });

    } catch (error) {
        console.log("Error in swipeRight: ", error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const swipeLeft = async (req, res) => {
    try {
        const { dislikedUserId } = req.params;
        const currUser = await User.findById(req.user.id);

        // dont want the same id twice
        if (!currUser.dislikes.includes(dislikedUserId)) {
            // push in the dislikes array if saved!
            currUser.dislikes.push(dislikedUserId);
            await currUser.save();
        }


        res.status(200).json({
            success: true,
            user: currUser
        });
    } catch (error) {
        console.log("Error in swipe left route: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const getMatches = async (req, res) => {
    try {
        // this populate like takes the matches and the name in the frontend
        const user = await User.findById(req.user._id).populate("matches", "name image");

        res.status(200).json({
            success: true,
            matches: user.matches
        });
    } catch (error) {
        console.log("Error in getting the matches: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const getUserProfiles = async (req, res) => {
    try {
        const currUser = await User.findById(req.user.id);

        const users = await User.find({
            $and: [
                {
                    // we dont want to see our own profile while swiping so therefore not equal to
                    _id: { $ne: currUser.id }
                },
                {
                    // we dont want to see the liked profiles again 
                    _id: { $nin: currUser.likes }
                },
                {
                    // we dont want to see the disliked profiles again 
                    _id: { $nin: currUser.dislikes }
                },
                {
                    // we dont want to see the persons with which we matched again as well
                    _id: { $nin: currUser.matches }
                },
                {
                    // if both prefered then show both or else the prefered one 
                    gender: currUser.genderPreference === "both"
                        ? { $nin: ["male", "female"] }
                        : currUser.genderPreference
                },

                // if i want girl and i am male but girl wants girl then she should both thats whu using this
                { genderPreference: { $in: [currUser.gender, "both"] } }
            ]
        });

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.log("Error in getting user profiles: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};