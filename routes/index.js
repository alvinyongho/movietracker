var express = require('express');
var router = express.Router();
var models = require('../models');


const scheme = {

  include:['@all'],

  exclude: ['@pk', '@fk'],

  assoc: {
  }

};



/* GET home page. */
router.get('/', function(req, res) {
  var result = {};

  models.Movie.findAll({limit: 10}).then(function(movies) {
    models.Movie.count().then(function(c) {
    
      result = {
        "draw": 1,
        "recordsTotal": c,
        "data": JSON.parse(movies)

      }
      console.log(result);

      
      res.render('index', {
      title: 'Movies listing',
      movies: movies
      });
 
    })
    
  });

});

module.exports = router;
