var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res) {
  models.Movie.create({
    movie_title: req.body.movie_title,
    studio: req.body.studio,
    year: req.body.year,
    box_office: req.body.box_office,
    picture: req.body.picture
  }).then(function() {
    res.redirect('/movietracker');
  });
});

router.get('/:movie_id/destroy', function(req, res) {
  models.Movie.destroy({
    where: {
      id: req.params.movie_id
    }
  }).then(function() {
    res.redirect('/movietracker');
  });
});



module.exports = router;