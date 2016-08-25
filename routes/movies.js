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


router.post('/scrape', function(req, res) {
  // models.Movie.create({
  //   movie_title: req.body.movie_title,
  //   studio: req.body.studio,
  //   year: req.body.year,
  //   box_office: req.body.box_office,
  //   picture: req.body.picture
  // }).then(function() {


    var request = require('request');
    var cheerio = require('cheerio');
    var i=0;
    for (i=0; i<7; i++){
      var url = "http://www.boxofficemojo.com/alltime/world/?pagenum=" + i + "&p=.htm"
      console.log(url);
      request(url, (function(i){
          return function(err, resp, body) {
          if (err)
              throw err;
          $ = cheerio.load(body);
          console.log(i);


          // TODO: scraping goes here!




          $('#body table:nth-child(3) tbody tr td:nth-child(1) table tbody tr').each(function(day) {
              $(this).find('div').each(function() {
                  console.log($(this).text());
              });
          });


          }
      })(i));

    }


    // request('http://www.google.com', function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     console.log(body) // Show the HTML for the Google homepage. 
    //   }
    // });

    console.log("Running scraping");
    res.redirect('/movietracker');
  // });
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