import { RequestHandler } from "express";
import User from "../models/user";

// @desc    Fecth user details
// @route   GET /api/user/dashboard
// @access  Public
export const getDashboard: RequestHandler = async (req, res) => {
    try {
        const user = req.user;

        // Check if user exists
        if (!user) {
            return res.status(400).json({ status: "fail", message: "User not found." });
        }

        // Sending user data
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).json({ status: "fail", message: "Error in registerUser" });
        console.log(error.message);
    }
};

// @desc    update user profile pic
// @route   PUT /api/user/update-profile
// @access  Public
export const updateProfile: RequestHandler = async (req, res) => {
    try {

    } catch (error: any) {
        res.status(500).json({ status: "fail", message: "Error in logoutUser" });
        console.log(error.message);
    }
}

// @desc    find users by username
// @route   POST /api/user/users
// @access  Public
export const findUsers: RequestHandler = async (req, res) => {
    try {
        const { userName } = req.body;

        // Finding users with given name
        const results = await User.find({
            $and: [
                {
                    name: {
                        $regex: `^${userName}`,
                        $options: 'i'
                    }
                },
                { _id: { $ne: req.user._id } }
            ]
        }).select("-_id");

        // Sending list of users
        res.status(201).json(results);

    } catch (error: any) {
        res.status(500).json({ status: "fail", message: "Error in logoutUser" });
        console.log(error.message);
    }
}