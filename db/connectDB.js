import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Database successfully");
  } catch (error) {
    console.error("Error connecting to Database: ", error);
    process.exit(1);
  }
};

export default connectDB;
