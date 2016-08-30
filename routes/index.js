var express = require('express');
var router = express.Router();
var models = require('../models');

var async = require('async'),
    QueryBuilder = require('datatable');

const scheme = {

  include:['@all'],

  exclude: ['@pk', '@fk'],

  assoc: {
  }

};



/* GET home page. */
router.get('/', function(req, res) {

  var tableDefinition = {
    sTableName: 'Movie'
  };

  var queryBuilder = new QueryBuilder(tableDefinition);
  var requestQuery = {
    iDisplayStart: 0,
    iDisplayLength: 5
  };

  var queries = queryBuilder.buildQuery(requestQuery);

  console.log("THE QUERIES VARIABLE@@@: " + queries);


  // Connect to ymsql
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'movieadmin',
    password : 'cse135_Nodeapp',
    database : 'movieapp'
  });

  connection.connect();

  connection.query('SELECT * from < table name >', function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.');
  });

  connection.end();











  models.Movie.findAll({limit: 1}).then(function(movies) {
    
    res.render('index', {
      title: 'Movies listing',
      movies: movies
    });
  });

    // (models.Movie.findAll().then(function(movies) {
    //   console.log(JSON.stringify(movies))
    // }));
});

module.exports = router;
