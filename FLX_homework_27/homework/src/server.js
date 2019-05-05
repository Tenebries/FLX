const express = require('express');
const routes = require('./routes');
const app = express();

app.use('/car', routes);

app.get('/', function (req, res) {
  res.send('Server working...');
});

app.listen(3000);
