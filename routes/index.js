var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('index', { 
		name: 'Movie Name' 
	});

});

module.exports = router;