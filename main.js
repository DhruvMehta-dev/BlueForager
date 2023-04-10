document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const query = document.getElementById('query').value;
    const metric = document.getElementById('metric').value;
  
    const response = await fetch(`/rank-tweets?query=${query}&metric=${metric}`);
    const rankedTweets = await response.json();
  
    const tableBody = document.getElementById('tweets-table').querySelector('tbody');
    tableBody.innerHTML = '';
  
    rankedTweets.forEach((tweet, index) => {
      const row = document.createElement('tr');
  
      const rankCell = document.createElement('th');
      rankCell.scope = 'row';
      rankCell.textContent = index + 1;
  
      const usernameCell = document.createElement('td');
      usernameCell.textContent = `@${tweet.user.username}`;
  
      const tweetCell = document.createElement('td');
      tweetCell.textContent = tweet.text;
  
      const metricValueCell = document.createElement('td');
      metricValueCell.textContent = tweet.public_metrics[metric];
  
      row.appendChild(rankCell);
      row.appendChild(usernameCell);
      row.appendChild(tweetCell);
      row.appendChild(metricValueCell);
  
      tableBody.appendChild(row);
    });
  });
  