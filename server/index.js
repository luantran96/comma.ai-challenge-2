const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 4000;
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, '../dist/')));

fs.readdir('./trips', (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach(file => {
    console.log(file);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/app.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

