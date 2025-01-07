import { TwitterApi } from "twitter-api-v2";
import express from "express";
const router = express.Router();

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_CLIENT_ID,
  appSecret: process.env.TWITTER_CLIENT_SECRET,
  callback: "http://localhost:4001/api/v1/twitter/callback",
});

router.get("/login", async (req, res) => {
  try {
    const { url, oauth_token, oauth_token_secret } =
      await twitterClient.generateAuthLink(
        "http://localhost:4001/api/v1/twitter/callback"
      );

    req.session.oauth_token = oauth_token;
    req.session.oauth_token_secret = oauth_token_secret;

    res.redirect(url);
  } catch (error) {
    console.error("Error initiating Twitter login:", error.message);
    res.status(500).send("Twitter login failed");
  }
});

router.get("/callback", async (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;

  const { oauth_token_secret } = req.session;

  if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
    return res.status(400).send("Invalid request");
  }

  try {
    const loginResult = await twitterClient.login(oauth_token, oauth_verifier);

    const { accessToken, accessSecret, client: loggedInClient } = loginResult;

    const user = await loggedInClient.v2.me({
      "user.fields": "profile_image_url,public_metrics",
    });

    res.status(200).json({
      accessToken,
      accessSecret,
      user,
    });
  } catch (error) {
    console.error("Twitter callback error:", error.message);
    res.status(500).send("Twitter callback failed");
  }
});

// Fetch user profile and basic data
router.get("/fetch-user-data", async (req, res) => {
  const { user_id } = req.query;

  try {
    const userData = await twitterClient.v2.user(user_id, {
      "user.fields": "profile_image_url,public_metrics",
    });

    if (!userData || !userData.data) {
      return res.status(404).json({
        status: "error",
        message: "Twitter user data not found",
      });
    }

    const { public_metrics, profile_image_url } = userData.data;

    res.status(200).json({
      followers_count: public_metrics.followers_count,
      following_count: public_metrics.following_count,
      total_tweets: public_metrics.tweet_count,
      profile_image_url,
    });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user data",
    });
  }
});

// Fetch recent posts and engagement data
router.get("/fetch-user-posts", async (req, res) => {
  const { user_id, count = 5 } = req.query;

  try {
    const tweets = await twitterClient.v2.userTimeline(user_id, {
      "tweet.fields": "public_metrics,created_at",
      max_results: count,
    });

    if (!tweets || !tweets.data) {
      return res.status(404).json({
        status: "error",
        message: "No tweets found for the user",
      });
    }

    const posts = tweets.data.map((tweet) => ({
      post_id: tweet.id,
      content: tweet.text,
      likes: tweet.public_metrics.like_count,
      comments: tweet.public_metrics.reply_count,
      shares: tweet.public_metrics.retweet_count,
      engagement_rate: (
        (tweet.public_metrics.like_count +
          tweet.public_metrics.reply_count +
          tweet.public_metrics.retweet_count) /
        (tweet.public_metrics.like_count + 1)
      ).toFixed(2),
      timestamp: tweet.created_at,
    }));

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user posts",
    });
  }
});

// Fetch engagement metrics for a specific tweet
router.get("/fetch-engagement-metrics", async (req, res) => {
  const { post_id } = req.query;

  try {
    const tweet = await twitterClient.v2.singleTweet(post_id, {
      "tweet.fields": "public_metrics",
    });

    if (!tweet || !tweet.data) {
      return res.status(404).json({
        status: "error",
        message: "Tweet not found",
      });
    }

    const metrics = tweet.data.public_metrics;

    res.status(200).json({
      total_likes: metrics.like_count,
      total_comments: metrics.reply_count,
      total_shares: metrics.retweet_count,
      engagement_rate: (
        (metrics.like_count + metrics.reply_count + metrics.retweet_count) /
        (metrics.like_count + 1)
      ).toFixed(2),
    });
  } catch (error) {
    console.error("Error fetching engagement metrics:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch engagement metrics",
    });
  }
});

export default router;
