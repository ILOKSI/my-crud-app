import mongoose from "mongoose";

const Company = new  mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    contacts: {
        type: [Object]
    },
    createdBy: {
        type: ObjectId
    }
})