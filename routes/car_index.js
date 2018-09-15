var express = require('express');
var router = express.Router();

/*get renlian page*/
router.get('/',function(req,res,next){
	res.render('car_index');
});

module.exports = router;
