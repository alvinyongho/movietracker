var express= require('express');
var Sequelize = require('sequelize')

var app = express();


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8000, function () {
  console.log('Example app listening on port 3000!');
});



var sequelize = new Sequelize('movieapp', 'movieapp', 'cse135_Nodeapp', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
  	max: 5,
  	min: 0,
  	idle: 10000
  },

});


// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello Apache!\n');
// }).listen(8000, '127.0.0.1');
