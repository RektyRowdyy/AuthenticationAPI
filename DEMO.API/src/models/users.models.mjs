import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    allowedTo: {
        type: mongoose.Schema.Types.Number,
        required: true,
        enum: [1, 2]
    }
})

export const Users = mongoose.model("Users", userSchema)