const express = require('express');
const bodyParser = require('body-parser');
const getRankedTweets = require('./rank-tweets');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Tweet Ranker!</h1>
    <form action="/rank" method="POST">
      <label for="userHandle">User Handle:</label>
      <input type="text" id="userHandle" name="userHandle" placeholder="@example" required>
      <input type="submit" value="Get Ranked Tweets">
    </form>
  `);
});

app.post('/rank', async (req, res) => {
  try {
    const userHandle = req.body.userHandle;
    const rankedTweets = await getRankedTweets(userHandle, 'likes'); // 'likes' is used as an example sorting criterion
    res.json(rankedTweets);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the ranked tweets');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
