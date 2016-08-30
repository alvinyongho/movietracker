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
  var prev_page = 0;


  var result = {};

  var result_data = [];
  


  if (!numrow) {
    numrow = 20;
  }

  if(!page || page==0){
    page = 0;
    prev_page = 0;
  } else {
    prev_page = parseInt(page)-1;
  }



  var offset = Number(page) * Number(numrow);
  console.log("CURRENT START IS " + offset);


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

          if (numrow == 'ALL'){
            models.Movie.findAll().then(function(movies) {
              callback(null, movies);
            });
          } else {
            models.Movie.findAll({offset: parseInt(offset), limit: parseInt(numrow)}).then(function(movies) {
              callback(null, movies);
            });
          }
            
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


    console.log("COUNT"+results.one);
    res.render('index', {
    title: 'Movies listing',
    movies: results.two,
    next_page: (parseInt(page)+1),
    prev_page: prev_page,
    numrow: numrow


    // resulting_array: stringified
    });
 
      // results is equal to: {one: 1, two: 2}
  });







});

module.exports = router;
