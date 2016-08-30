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

  var page_limit = 5;

  if (req.query.limit){
    page_limit = req.query.limit;
  }



  models.Movie.findAll({ limit: page_limit }).then(function(movies) {
    
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
