var Model_data = require('../model/__data');

const __config = require('../public/json/configuraction.json');
module.exports.__MUDO = {
    get:function(req,res,next){
		res.render('__MUDO',{
			title:'测试页面',
			follow:{
				age:18
			}
		})
	},
    postData:function(req,res,next){
        //this is post uri
        res.send(__config);
    }
};

module.exports.__SignaTures = {
	views:function(req,res,next){
		res.render('test-active',{
			title:'this is signatures~',
			value:{
				developer:'cnzmg',
				author:'cnzmg',
				age:18,
				address:'CN-GZ'
			}
		})
	}
}

module.exports.__mbox = {
	views:function(req,res,next){
		
		var postData = {
			time:"123",
			data:"123",
			val:"123"
		};
		
		Model_data.create(postData,function(err,_data){
			req.session.data = _data; //添加数据
			res.render('mbox',{
				title:'成功'
			});
		})
		
//		var datalist = Model_data.find({}, null,{ sort: { _id: -1} }).populate('data');  //查询用户表
//		
//		datalist.exec(function(err,_val){
//			console.log(_val);
//			res.render('mbox',{
//				title:'super version cnzmg Popups！',
//				value:_val
//			});
//		});
	},
}

module.exports.__yellow = {
	post:function(req,res,next){
		var data = req;
		res.send(data);
	}
}
