var express = require('express');
var router = express.Router();
var models = require('../models');
var async = require('async')

const scheme = {

  include:['@all'],

  exclude: ['@pk', '@fk'],

  assoc: {
  }

};



/* GET home page. */
router.get('/', function(req, res) {
  var start = req.param('start');
  var end = req.param('end');


  var result = {};

  var result_data = [];
  

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

          models.Movie.findAll({limit: 10}).then(function(movies) {
            callback(null, movies);
          });
            
        // }, 1000);
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
    res.render('index', {
    title: 'Movies listing',
    movies: results.two,
    // resulting_array: stringified
    });
 
      // results is equal to: {one: 1, two: 2}
  });







});

module.exports = router;
