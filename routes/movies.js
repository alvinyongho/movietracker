var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.Movie.create({
    movie_title: req.body.username
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/:movie_id/destroy', function(req, res) {
  models.Movie.destroy({
    where: {
      id: req.params.movie_id
    }
  }).then(function() {
    res.redirect('/');
  });
});



module.exports = router;