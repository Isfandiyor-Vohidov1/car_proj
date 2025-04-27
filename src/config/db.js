import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB successfully connected");
    } catch (error) {
        console.log("Error connecting MongoDB:", error.message);
        process.exit(1);
    }
}
