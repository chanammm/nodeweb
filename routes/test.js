var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test',{index:'show',body:{
  	title:'json',
  	body:'this is body!'
  }})
});

module.exports = router;
