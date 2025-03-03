// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle comment submission
app.post('/submit-comment', (req, res) => {
  const comment = req.body.comment;
  const timestamp = new Date().toISOString();

  // Append the comment to comments.txt
  fs.appendFile('comments.txt', `${timestamp}: ${comment}\n`, (err) => {
    if (err) {
      console.error('Error saving comment:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Comment saved successfully!');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});