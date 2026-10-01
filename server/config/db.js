import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MonogoDB connected")
    } catch (error) {
        console.error("MonogoDB connection failed:", error.message);
        process.exit(1);
    }
}


export default connectDB;