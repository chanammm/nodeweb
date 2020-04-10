// JavaScript Document
var _modu = require('../plugin/__config');
var _data = require('../plugin/__data');

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
//	app.get('/interface', _modu.interface.get);
//	app.post('/interface', _modu.interface.post);
//
//// 获取wechat api
//	app.get('/wechat', _modu.wechat.post);



// 微信管理 api
//	app.get('/technology/_wechat',_modu._wechat.get);
//	app.post('/technology/_wechat',_modu._wechat.post);

// 问卷调查
	app.post('/technology/questionnaire',_modu.questionnaire.post);
	app.get('/technology/questionnaire',_modu.questionnaire.get);

// 问卷导出
	app.get('/technology/Squestionnaire',_modu.Squestionnaire.get);

	
	// 问卷导出
	app.get('/show',_modu.getAjaxError.get);
	app.post('/show',_modu.getAjaxError.post);

	//自学考试时间安排
	app.get('/examination',_modu.examination.get);

	app.post('/test', _modu.tests.post);
	
	app.post('/client', _modu.client.post);

	/**
	 * 檬吧 订阅号 消息订阅 推送
	 * **/
	app.post('/wechatMessage', _data.wechatMessage.post);
}