var express = require('express');
var router = express.Router();
var models = require('../models');

var async = require('async');
var QueryBuilder = require('datatable');



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


  models.Movie.findAll().then(function(movies) {
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
