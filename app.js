var express= require('express');
var Sequelize = require('sequelize')

var app = express();



// Establish mysql connection

var sequelize = new Sequelize('movieapp', 'movieadmin', 'cse135_Nodeapp', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
  	max: 5,
  	min: 0,
  	idle: 10000
  },

});


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8000, function () {
  console.log('Example app listening on port 3000!');
  
  sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });
});





// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello Apache!\n');
// }).listen(8000, '127.0.0.1');
