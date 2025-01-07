import dotenv from "dotenv";
dotenv.config();
import { connect } from "mongoose";
const mongodbURI = process.env.MONGODBURI;

/**
 * @desc connects to MongoDB
 */
const connectToMongodb = async () => {
  try {
    console.log(mongodbURI);

    await connect(mongodbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
  }
};

export default connectToMongodb;
