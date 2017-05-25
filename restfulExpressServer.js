const express = require('express');
const petRouter = require('./router');

const app = express();
app.use('/pets', petRouter);

app.use((req, res) => {
  res.header('Content-Type', 'text/plain');
  res.status(404).send('Not Found');
});

app.use((err, req ,res) => {
  console.error(err.stack);
  res.header('Content-Type', 'text/plain');
  res.status(500).send('Internal Server Error');
});

app.listen(8000);
module.exports = app;
