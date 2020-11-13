const mongoose = require("mongoose");
let postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    text: {
        type: String,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
            name: {
                type: String,
            },
            text: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now(),
            },
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "user",
                    },
                },
            ],
        },
    ],
});
const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
