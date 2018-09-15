var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.render('car_find',{index:'发现'});
});

module.exports = router;
