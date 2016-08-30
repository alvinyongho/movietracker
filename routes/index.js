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

  models.Movie.count().then(function(c) {
    console.log("There are " + c + " movies!")
  });

  models.Movie.findAll({limit: 10}).then(function(movies) {
    
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
