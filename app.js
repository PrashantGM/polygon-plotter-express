const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
const results = [];

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/poly', (req, res) => {
  fs.createReadStream('polygon.csv')
    .pipe(csvParser({ headers: false }))
    .on('data', (data) => {
      results.push(data);
    });
  res.json(results);
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
