const express = require('express');
const port = 5000;
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.listen(port, () => {
  
  console.log(`Server started on port ${port}`);
});