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
    sTableName: 'Movies'
  };

  var queryBuilder = new QueryBuilder(tableDefinition);
  var requestQuery = {
    iDisplayStart: 0,
    iDisplayLength: 5
  };

  var queries = queryBuilder.buildQuery(requestQuery);

  console.log(queries);


  // Connect to ymsql
  var mysql      = require('mysql');
  var pool = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'movieadmin',
    password : 'cse135_Nodeapp',
    database : 'movieapp'
  });




  pool.query(queries.changeDatabaseOrSchema, function(err){
    if (err) { res.error(err); }
    else{
        async.parallel(
            {
                recordsFiltered: function(cb) {
                    myDbObject.query(queries.recordsFiltered, cb);
                },
                recordsTotal: function(cb) {
                    myDbObject.query(queries.recordsTotal, cb);
                },
                select: function(cb) {
                    myDbObject.query(queries.select, cb);
                }
            },
            function(err, results) {
                if (err) { res.error(err); }
                else {
                    res.json(queryBuilder.parseResponse(results));
                }
            }
        );
    }
});











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
