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
	app.post('/viewpost',_modu.__mbox.viewpost);
	
	//测试请求数据
	app.post('/__yellow',_modu.__yellow.post);
	
	//app
	app.get('/app',_modu.viewapp.get);
	
	
//	chargood views 
	app.get('/ChartGood',_modu.chartgood.get);
	app.post('/ChartGood',_modu.chartgood.post);
	
//	admin login animate
	app.get('/_buff',_modu._buff.view);
	
//	loading 
	app.get('/loading',_modu.loading.view);
//	d3js 
	app.get('/technology/d3js',_modu.d3.view);
// tx parnter
	app.get('/technology/tx_partner',_modu.partner.view);
// 虚拟DOM
	app.get('/technology/mongo',_modu.mongo.view);
//模拟 咖速修 接口
	app.get('/interface', _modu.interface.get);
	app.post('/interface', _modu.interface.post);
}