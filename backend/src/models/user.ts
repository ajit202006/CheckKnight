import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../lib/interfaces";

// Create User Schema
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"]
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email"
            ]
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minlength: 6,
            select: false
        },
        rating: {
            type: Number,
            default: 700
        },
        gamesPlayed: {
            type: Number,
            default: 0
        },
        gamesWon: {
            type: Number,
            default: 0
        },
        gamesDrawn: {
            type: Number,
            default: 0,
        },
        playedAsWhite: {
            type: Number,
            default: 0,
        },
        wonAsWhite: {
            type: Number,
            default: 0,
        },
        drawAsWhite: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Hash password before saving user
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = await User.findById(this._id, { password: 1 });
    return await bcrypt.compare(candidatePassword, user?.password || "");
};

// Create and export User model
const User = model<IUser>("User", userSchema);
export default User;