var express= require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var Sequelize = require('sequelize')
var jade = require('jade');
var routes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Establish mysql connection

app.use('/', routes);

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(8000, function () {
  console.log('Example app listening on port 3000!');
  

});


module.exports = app;



// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello Apache!\n');
// }).listen(8000, '127.0.0.1');
