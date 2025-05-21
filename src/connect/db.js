import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = () => {
  return mongoose.connect(process.env.API_URL);
};

export default connectDB;
