const { getTweets } = require("./twitter-api");

async function getRankedTweets(userHandle, sortBy) {
  const tweets = await getTweets(userHandle);

  return tweets.sort((a, b) => {
    const metricA = a.public_metrics[sortBy];
    const metricB = b.public_metrics[sortBy];

    return metricB - metricA;
  });
}

module.exports = getRankedTweets;
