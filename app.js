var express= require('express');
var app = express();

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));




// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello Apache!\n');
// }).listen(8000, '127.0.0.1');
