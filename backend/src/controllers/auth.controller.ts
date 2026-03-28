import { RequestHandler } from "express";
import User from "../models/user";
import { generateToken } from "../lib/utils";

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser: RequestHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ status: "fail", message: "User already exists." });
        }

        // Create user
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Generate token
        await generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            rating: newUser.rating,
        });
    } catch (error: any) {
        res.status(500).json({ status: "fail", message: "Error in registerUser" });
        console.log(error.message);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: "fail", message: "User not found" });
        }

        // Check password match
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ status: "fail", message: "Invalid credentials" });
        }

        // Generate token
        await generateToken(user._id, res);

        // Login response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            rating: user.rating,
        });
    } catch (error: any) {
        res.status(500).json({ status: "fail", message: "Error in loginUser" });
        console.log(error.message);
    }
};

export const logoutUser: RequestHandler = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ status: "success", message: "Logged out successfully" })
    } catch (error: any) {
        res.status(500).json({ status: "fail", message: "Error in logoutUser" });
        console.log(error.message);
    }
}