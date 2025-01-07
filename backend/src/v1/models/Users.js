import mongoose, { model } from "mongoose";
// const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  twitterId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profileImageUrl: { type: String },
  oauthToken: { type: String, required: true },
  oauthSecret: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
User.createIndexes();
export default User;
