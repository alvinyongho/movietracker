var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
  // models.Movie.findAll().then(function(movies) {
    res.render('index', {
      title: 'Movies listing',
      // movies: movies
    // });
  });

    (models.Movie.findAll().then(function(movies) {
      console.log(JSON.stringify(movies))
    }));
});

module.exports = router;
