import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";

import authRouter from "./routes/auth.route"
import { IUser } from "./lib/interfaces";

// Configuring dotenv
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

declare global {
    namespace Express {
        interface Request {
            user: IUser
        }
    }
}

// Mount routes
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});