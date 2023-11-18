import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// const uri = "mongodb+srv://nidheesho768:pvjj8YZrb7IYXLQv@trav7.8hfjuhh.mongodb.net/travelauth?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;
