import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();// Load environment variables


const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To MongoDB Successfully");
  } catch (error) {
    console.log(error);
  }
};
export default connectToMongo;
