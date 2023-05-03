const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Serve the index.html file as the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Configure the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submissions
app.post('/grade', (req, res) => {
  // Split the scores string into an array of numbers
  const scores = req.body.scores.split(',').map(Number);

  // Calculate the average score
  const averageScore = scores.reduce((total, score) => total + score, 0) / scores.length;

  // Assign a grade based on the average score
  let grade;
  if (averageScore >= 90) {
    grade = 'A';
  } else if (averageScore >= 80) {
    grade = 'B';
  } else if (averageScore >= 70) {
    grade = 'C';
  } else if (averageScore >= 60) {
    grade = 'D';
  } else {
    grade = 'F';
  }

  // Send the grade as a response
  res.send(`The average score is ${averageScore.toFixed(2)}, which is a grade of ${grade}`);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});