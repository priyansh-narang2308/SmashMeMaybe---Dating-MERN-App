import User from "../models/User.js";
import jwt from "jsonwebtoken";


// for jwt token
const signToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" });
};


export const signup = async (req, res) => {
    const { name, email, password, age, gender, genderPreference } = req.body;

    try {

        if (!name || !email || !password || !age || !gender || !genderPreference) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: "You must be atleast 18 years old 💘"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be atleast 6 characters long 👁️"
            });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            age,
            gender,
            genderPreference
        });

        const token = signToken(newUser._id);

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, //7days
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(201).json({
            success: true,
            token,
            user: newUser,
            message: "User Registered Successfully!"
        });

    } catch (error) {
        console.log("Error in signing up the user: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
};

export const login = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ success: false, message: "Request body is missing" });
    }

    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = signToken(user._id);

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            success: true,
            token,
            user,
            message: "User Logged In Successfully!"
        });

    } catch (error) {
        console.log("Error in logging in the user: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
};


export const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({
        success: true,
        message: "User Logged out Successfully!"
    });
};