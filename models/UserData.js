const mongoose = require("mongoose")


const userDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        pattern: /^[6-9]\d{9}$/,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const UserData = mongoose.model("UserData", userDataSchema)

module.exports = UserData