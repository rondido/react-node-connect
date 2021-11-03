var express = require('express');
var app = express();

/* GET users listing. */
app.post('/', function(req, res, next) {
  res.send({'message':'node get success'});
});

module.exports = app;