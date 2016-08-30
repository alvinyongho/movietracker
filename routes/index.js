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
  var result = {};

  var result_data = [];
  

  async.parallel({
    one: function(callback){
        setTimeout(function(){
          models.Movie.count().then(function(c) {

            callback(null, c);

          })
        }, 1000);
    },
    two: function(callback){
        setTimeout(function(){

          models.Movie.findAll({limit: 10}).then(function(movies) {
            callback(null, movies);
          });
            
        }, 1000);
    }
  },
  function(err, results) {

    result_data = {
        "draw": 1,
        "recordsTotal": results.one,
        "data": JSON.parse(JSON.stringify(movies))
    }
    
    var stringified = JSON.stringify(result_data);
      
    res.render('index', {
    title: 'Movies listing',
    movies: results.two,
    result: result_data
    });
 
      // results is equal to: {one: 1, two: 2}
  });







});

module.exports = router;
