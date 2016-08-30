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
  models.Movie.findAll({limit: 10}).then(function(movies) {
    models.Movie.count().then(function(c) {
    
      result_data = {
        "draw": 1,
        "recordsTotal": c,
        "data": JSON.parse(JSON.stringify(movies))

      }
      var render_page = function(stringifed = JSON.stringify(result_data)){
        res.render('index', {
        title: 'Movies listing',
        movies: movies,
        result: stringified
        });
      };


     
 
    })
    
  });

  








});

module.exports = router;
