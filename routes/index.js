var express = require('express');
var router = express.Router();
var models = require('../models');

var async = require('async'),
    QueryBuilder = require('datatable');

const scheme = {

  include:['@all'],

  exclude: ['@pk', '@fk'],

  assoc: {
  }

};







var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : '127.0.0.1',
    user     : 'movieadmin',
    password : 'cse135_Nodeapp',
    database : 'movieapp'
    debug    :  false
});
 
function handle_database(req,res) {
       pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  
 
        console.log('connected as id ' + connection.threadId);
       
        connection.query("select * from Movies",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }          
        });
connection
        .on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;    
        });
  });
}

 
var async = require('async'),
    QueryBuilder = require('datatable');
 
var tableDefinition = {
    sTableName: 'Movies'
};
 
var queryBuilder = new QueryBuilder(tableDefinition);
 
// requestQuery is normally provided by the DataTables AJAX call
var requestQuery = {
    iDisplayStart: 0,
    iDisplayLength: 5
};
 
// Build an object of SQL statements
var queries = queryBuilder.buildQuery(requestQuery);
 
// Execute the SQL statements generated by queryBuilder.buildQuery
pool.query(queries.changeDatabaseOrSchema, function(err){
    if (err) { res.error(err); }
    else{
        async.parallel(
            {
                recordsFiltered: function(cb) {
                    pool.query(queries.recordsFiltered, cb);
                },
                recordsTotal: function(cb) {
                    pool.query(queries.recordsTotal, cb);
                },
                select: function(cb) {
                    pool.query(queries.select, cb);
                }
            },
            function(err, results) {
                if (err) { res.error(err); }
                else {
                    res.json(queryBuilder.parseResponse(results));
                }
            }
        );
    }
});



/* GET home page. */
router.get('/', function(req, res) {
  handle_database(req,res);












  models.Movie.findAll({limit: 1}).then(function(movies) {
    
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
