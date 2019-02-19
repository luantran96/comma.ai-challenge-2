const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 4000;
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, '../dist/')));



app.get('/data/getNames', (req, res) => {
  fs.readdir('./trips', (err, files) => {
    if (err) throw err;

    res.send(files);
  });
  //   files.forEach(file => {
  //     const src = fs.createReadStream(path.join(__dirname, '../trips', file));
  //     src.pipe(res);
  // })});
  
});

app.get('/data/:fileName', (req, res) => {
      const {fileName} = req.params;
      const src = fs.createReadStream(path.join(__dirname, '../trips', fileName));
      src.pipe(res);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/app.html'));
});



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

