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

  if (!req.query.limit){
    console.log('NO LIMIT@@@@@@')
  }


  models.Movie.findAll({ limit: 5 }).then(function(movies) {
    
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
