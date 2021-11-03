var express = require('express');
var app = express();

/* GET home page. */
app.get('/', function(req, res, next) {
  res.send('respond with a resource');
  res.render('index', { title: 'Express' });
});

module.exports = app;