import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: { 
        type: String, 
        enum: ["ADMIN", "MANAGER", "SALES", "SUPPORT"], 
        required: true 
    }
})

const User = mongoose.model('User', UserSchema)
export default User