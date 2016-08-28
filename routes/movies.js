var models  = require('../models');
var express = require('express');
var router  = express.Router();
var multer = require('multer');
var path = require('path')
const crypto = require('crypto');
var async = require('async');

var upload_dir = 'public/images/uploads/';

var storage = multer.diskStorage({
  destination: upload_dir,
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var file_limit = 
  {
    files: 1,
    fileSize: 512000
  }


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', multer({ storage: storage, limits: file_limit }).single('picture'), function(req, res) {
  
  // console.dir('THE FILE IS' + req.file);


  var result_name = req.file['filename'];

  models.Movie.create({
    movie_title: req.body.movie_title,
    studio: req.body.studio,
    year: req.body.year,
    box_office: req.body.box_office,
    picture: 'images/uploads/' + result_name
  }).then(function() {
    res.redirect('/movietracker');
  });
});



var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};



var update_movie_attributes = function(movie, full_file_path, result_id){
  movie.update(
    { picture:full_file_path },
    { _id : result_id }     
  );
}


router.post('/addimages', function(req, res){

  // Download an image
  var fs = require('fs'),
  request = require('request');
  
  var url = "http://www.omdbapi.com/?s=";
  var movie_title = "";

  // request.get({url:url, json:true}, function (e, r, body) {
  //     console.log(body['Search'][0]['Poster']);
  //   })

  var retrieve_image_url = function(movie){
    // console.dir(movie.get());

    var result = movie.get();
    var movie_title = result['movie_title'];

    var result_url = url+encodeURIComponent(movie_title);

    // var result_url = url+movie_title;
    request.get({url:result_url, json:true}, function (e, r, body) {
      
      // if(body['Search'] != 'undefined'){

      try {
        var poster_url = body['Search'][0]['Poster'];
        if ( poster_url == "N/A"){
          console.log('couldn find url');
        } else {
          // console.log(poster_url);


          // Insert getting the url here

          var full_file_path = 'public/images/uploads/' + path.parse(poster_url).base;
          download(poster_url, full_file_path, function(){
            console.log('done i can now add to result id ' + result.id);
            update_movie_attributes(movie, 'images/uploads/' + path.parse(poster_url).base, result.id);
          });

          // console.log("public/images/uploads/" + path.parse(poster_url).base);



          console.log(result.id);


          





        }
        // console.log(body['Search'][0]['Poster']);
      } catch(err) {
        // console.log(err);
        console.log('couldn not find url');
      }
    });

  }

  models.Movie.findAll().then(function(movies){
    movies.forEach(retrieve_image_url)
  });


  
  res.redirect('/movietracker');


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
                  temp_dictionary.year = $(this).find('td:nth-child(9)').text().trim().replace("^","");
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



router.post('/:movie_id/update', multer({ storage: storage, limits: file_limit }).single('picture'), function(req, res) {
  

  console.dir(req.file);
  var result_name = req.file['filename'];


  console.log("@@@@ THE RESULT NAME OF UPDATE IS" + result_name);
  console.log("The movie title is " + req.body.movie_title)
  console.log("The movie id is " + req.params.movie_id)


  models.Movie.update(

  { movie_title: req.body.movie_title,
    studio: req.body.studio,
    year: req.body.year,
    box_office: req.body.box_office,
    picture: 'images/uploads/' + result_name }, 
  
  { where: {id: req.params.movie_id} }

  ).then(function() {
    res.redirect('/movietracker');
  });
});


router.get('/:movie_id', function(req, res) {
  
  models.Movie.findById(req.params.movie_id).then(function(movie) {
    res.render('movie-edit', {
      title: 'movie edit',
      movie: movie
    });
  });

    // (models.Movie.findAll().then(function(movies) {
    //   console.log(JSON.stringify(movies))
    // }));
});


module.exports = router;