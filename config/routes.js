// JavaScript Document
var _modu = require('../plugin/__config');

module.exports = function (app){

	app.get('/', function (req, res, next){
		res.render('index', { title: '首页' });
	});
	
	//执行 获取配置  
	app.get('/__MUDO',_modu.__MUDO.get);
	app.post('/__MUDO',_modu.__MUDO.postData);
	
	//登陆动画canvas
	app.get('/test-active',_modu.__SignaTures.views);
	
	//服务器请求
	app.get('/mbox',_modu.__mbox.views);
	
	//测试请求数据
	app.post('/__yellow',_modu.__yellow.post);
	
}