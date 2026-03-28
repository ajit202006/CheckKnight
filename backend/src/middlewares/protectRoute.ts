import jwt from 'jsonwebtoken';
import User from '../models/user';
import { RequestHandler } from 'express';

// Protect routes by verifying JWT token
export const protectRoute: RequestHandler = async (req, res, next) => {
    try {
        // extracting token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({ status: "fail", message: "Unauthorized - No token provided." });
        }

        // decoding token
        const decoded = <jwt.JwtPayload>jwt.verify(token, process.env.JWT_SECRET || "");
        if (!decoded) {
            return res.status(400).json({ status: "fail", message: "Unauthorized - Invalid user token." });
        }

        // Finding user
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ status: "fail", message: "Unauthorized - No user found." })
        }

        // assigning user data to request user.
        req.user = user;

        next();
    } catch (error: any) {
        res.status(400).json({ status: "fail", message: "Internal server error." });
        console.log(error.message);
    }
};