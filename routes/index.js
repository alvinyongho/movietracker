var express = require('express');
var router = express.Router();
var models = require('../models');
var async = require('async');

const scheme = {

  include:['@all'],

  exclude: ['@pk', '@fk'],

  assoc: {
  }

};



/* GET home page. */
router.get('/', function(req, res) {
  var page = req.param('page');
  var numrow = req.param('rows');

  var current_start = parseInt(page) * parseInt(numrow);
  console.log("CURRENT START IS " + current_start);


  var result = {};

  var result_data = [];
  


  if (!numrow) {
    numrow = 20;
  }


  async.parallel({
    one: function(callback){
        // setTimeout(function(){
          models.Movie.count().then(function(c) {

            callback(null, c);

          })
        // }, 1000);
    },
    two: function(callback){
        // setTimeout(function(){
          if(page=='ALL'){
            models.Movie.findAll().then(function(movies) {
              callback(null, movies);
            });
          } else if (page=='5' || page=='10' || page=='20') {
            models.Movie.findAll({limit: parseInt(numrow)}).then(function(movies) {
              callback(null, movies);
            });
          }
                 
    }
  },
  function(err, results) {

    // result_data = {
    //     "draw": 1,
    //     "recordsTotal": results.one,
    //     "data": JSON.parse(JSON.stringify(results.two))
    // }
    
    // var stringified = JSON.stringify(result_data);
    
    // console.log("RESULT DATA IS...." + stringified);

    console.log("COUNT"+results.one);
    res.render('index', {
    title: 'Movies listing',
    movies: results.two,

    // resulting_array: stringified
    });
 
      // results is equal to: {one: 1, two: 2}
  });







});

module.exports = router;
