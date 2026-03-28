import { Document } from "mongoose";
export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    rating: Number,
    gamesPlayed: Number,
    gamesWon: Number,
    gamesDrawn: Number,
    playedAsWhite: Number,
    wonAsWhite: Number,
    drawAsWhite: Number,
    comparePassword(candidatePassword: string): Promise<boolean>
}