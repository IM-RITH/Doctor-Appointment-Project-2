const mongoose = require("mongoose");

// create user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    seenNoti: {
        type: Array,
        default: [],
    },
    unseenNoti: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true,
});

const user = mongoose.model("users", userSchema);
module.exports = user;