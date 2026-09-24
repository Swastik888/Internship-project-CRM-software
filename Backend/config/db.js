import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error("MONGO_URI not defined or not found");
    }

    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000
    });

    console.log(
        `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );
};