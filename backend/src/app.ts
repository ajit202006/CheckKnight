import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

import authRouter from "./routes/auth.route"

// Configuring dotenv
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

declare global{
    namespace Express{
        interface Request{
            user:{
                _id:string
                email:string,
                password:string,
                name:string,
            }
        }
    }
}

// Mount routes
app.use("/api/auth",authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});