const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const axios = require('axios');

const oauth = OAuth({
  consumer: {
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto
      .createHmac('sha1', key)
      .update(base_string)
      .digest('base64');
  },
});

const token = {
  key: process.env.TWITTER_ACCESS_TOKEN,
  secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

async function getTweetsByUserHandle(userHandle) {
  const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${userHandle}&count=100`;

  const request_data = {
    url: url,
    method: 'GET',
  };

  const headers = oauth.toHeader(oauth.authorize(request_data, token));

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getTweetsByUserHandle,
};
