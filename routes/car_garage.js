var express = require('express');
var router = express.Router();

/*get renlian page*/
router.get('/',function(req,res,next){
	res.render('car_garage',{index:{name:'排序',totle:'筛选',fn:function o(){
		fn.call(o);
	}}});
});

module.exports = router;