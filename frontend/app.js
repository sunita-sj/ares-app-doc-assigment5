const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const BACKEND_URL = process.env.BACKEND_URL || "http://backend:8000";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Show form
app.get('/', (req, res) => {
  res.render('form');
});
// Submit form
app.post('/submit', async (req, res) => {
  try {
    const response = await fetch(`${BACKEND_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (response.ok) {
      res.render('success');
    } else {
      res.send(`Error: ${data.error}`);
    }
  } catch (err) {
    res.send("Error connecting to backend");
  }
});

app.listen(PORT, () => console.log(`Frontend running on ${PORT}`));