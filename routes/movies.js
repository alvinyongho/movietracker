var models  = require('../models');
var express = require('express');
var router  = express.Router();
var multer = require('multer');
var path = require('path')
const crypto = require('crypto');


var storage = multer.diskStorage({
  destination: 'public/images/uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', multer({ storage: storage}).single('picture'), function(req, res) {
  
  // console.dir(req.file);
  var result_name = req.file['filename'];

  models.Movie.create({
    movie_title: req.body.movie_title,
    studio: req.body.studio,
    year: req.body.year,
    box_office: req.body.box_office,
    picture: result_name
  }).then(function() {
    res.redirect('/movietracker');
  });
});




router.post('/addimages', function(req, res){

  // Download an image
  var fs = require('fs'),
  request = require('request');
  
  var url = "http://www.omdbapi.com/?s=";
  var movie_title = "";

  // request.get({url:url, json:true}, function (e, r, body) {
  //     console.log(body['Search'][0]['Poster']);
  //   })


  models.Movie.findAll().then(function(movies) {
    for (movie in movies){
      
      movie_title = movie.movie_title;
      var result_url = url+movie_title;
      request.get({url:url, json:true}, function (e, r, body) {
        console.log(body['Search'][0]['Poster']);
      })

      // movie.update({

      // });

    }
  });




  // var download = function(uri, filename, callback){
  //   request.head(uri, function(err, res, body){
  //     console.log('content-type:', res.headers['content-type']);
  //     console.log('content-length:', res.headers['content-length']);

  //     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  //   });
  // };

  // download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
  //   console.log('done');




  //   res.redirect('/movietracker');
  // });




      res.redirect('/movietracker');


  // models.Movie.findAll().then(function(movies) {

  // }

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

    var json_output=[];
    var temp_dictionary = {'movie_title': null, 'studio': null, 'year': null, 'box_office': null, 'picture':null};

    for (i=0; i<7; i++){
      var url = "http://www.boxofficemojo.com/alltime/world/?pagenum=" + i + "&p=.htm"
      console.log(url);
      request(url, (function(i){
          return function(err, resp, body) {
          if (err)
              throw err;
          $ = cheerio.load(body);


          $('#body table:nth-child(3) td').each(function(movie_row) {
          
              $(this).find('tr:nth-child(1)').remove();


              $(this).find('tr').each(function() {
                  

                  temp_dictionary.movie_title = $(this).find('td:nth-child(2)').text().trim();
                  temp_dictionary.studio = $(this).find('td:nth-child(3)').text().trim();
                  temp_dictionary.box_office = $(this).find('td:nth-child(4)').text().trim();
                  temp_dictionary.year = $(this).find('td:nth-child(9)').text().trim();
                  //json_output.push(temp_dictionary);
                  console.log("ADDING TO DATABASE: " + temp_dictionary)


                  models.Movie.create(temp_dictionary);


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