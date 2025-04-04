import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User Not Authorized - No token Provided!"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized - Invalid Token"
            });
        }

        const currentUser = await User.findById(decoded.id);
        req.user = currentUser;

        next();
    } catch (error) {
        console.log("Error auth middleware: ", error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized - Invalid Token"
            });
        } else {
            res.status(500).json({ success: false, message: "Internal Server Error!" });

        }
    }
};