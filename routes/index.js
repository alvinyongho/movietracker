var express = require('express');
var router = express.Router();
var models = require('../models');

var async = require('async');
var QueryBuilder = require('datatable');

var Serializer = require('sequelize-to-json');




const scheme = {

  include:['@all'],

  exclude: ['@pk', '@fk'],

  assoc: {
  }

};








/* GET home page. */
router.get('/', function(req, res) {
  
  var cylonsoft_sequelize_datatables = require('cylonsoft-sequelize-datatables');
  cylonsoft_sequelize_datatables.awesome();

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
    let serializer = new Serializer(models.Movie, scheme);
    let postAsJSON = serializer.serialize(movies[0]);

    res.render('index', {
      title: 'Movies listing',
      movies: movies,
      postAsJSON: JSON.stringify(movies)
    });
  });

    // (models.Movie.findAll().then(function(movies) {
    //   console.log(JSON.stringify(movies))
    // }));
});

module.exports = router;
