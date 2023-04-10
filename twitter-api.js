const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

async function getTweets(userHandle) {
  try {
    // Get user ID based on the username (handle)
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${userHandle}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const userId = response.data.data.id;

    // Get tweets for the specified user ID
    const tweetsResponse = await axios.get(
      `https://api.twitter.com/2/users/${userId}/tweets`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        params: {
          'tweet.fields': 'public_metrics',
          max_results: 100,
        },
      }
    );

    return tweetsResponse.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getTweets,
};
