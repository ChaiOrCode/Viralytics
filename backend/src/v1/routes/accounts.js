import express from "express";
import User from "../models/Users.js";

import axios from "axios";

const router = express.Router();

router.post("/signInWithTwitter", async (request, response) => {
  try {
    const { twitterToken, twitterSecret } = request.body;

    const twitterUser = await axios.post(
      "https://api.twitter.com/2/oauth2/token",
      { token: twitterToken }
    );

    const { id, name, profile_image_url } = twitterUser.data;

    let user = await User.findOne({ twitterId: id });

    if (!user) {
      user = new User({
        twitterId: id,
        name,
        profileImageUrl: profile_image_url,
        oauthToken: twitterToken,
        oauthSecret: twitterSecret,
      });
      await user.save();
    }

    response.status(200).json({
      status: "success",
      message: "User signed in with Twitter successfully",
      data: {
        twitterId: user.twitterId,
        name: user.name,
        profileImageUrl: user.profileImageUrl,
      },
    });
  } catch (error) {
    console.error("Twitter sign-in error:", error.message);
    response
      .status(500)
      .json({ status: "error", message: "Twitter sign-in failed" });
  }
});

export default router;
