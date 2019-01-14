var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.render('loading',{index:'this is test-active loader'})
})

module.exports = router;