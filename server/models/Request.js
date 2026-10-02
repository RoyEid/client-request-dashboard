import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        clientName: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["New", "In Progress", "Done"],
            default: "New",
        }
    },
    {
        timestamps: true,
    }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;