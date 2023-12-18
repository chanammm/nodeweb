// JavaScript Document
var _modu = require('../plugin/__config');
var _data = require('../plugin/__data');
var uploadr = require('../plugin/uploadr');
var moted = require('../plugin/moted');  //目前是 针对 邮件
var wx = require('../plugin/wx');  //目前是 针对 wx
var dy = require('../plugin/dy');  //目前是 针对 抖音
// var fstest = require('../plugin/fstest');  //目前是 测试 应用
var ms = require("../plugin/ms");

// 文件处理
var multer = require('multer');
var storage = multer.diskStorage({
//设置上传后文件路径，uploads文件夹需要手动创建！！！
	destination: function (req, file, cb) {
		cb(null, './upload')
	}, 
//给上传文件重命名，获取添加后缀名
	filename: function (req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});  
//添加配置文件到muler对象。
var upload = multer({
	storage: storage
});


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

	/**
	 * 2020-07-13
	 * 外单 用户登陆注册
	 * 音响 网站  作废
	 * **/
	app.get('/LoginUser', _modu.LoginUser.get);
	app.post('/LoginUser', _modu.LoginUser.post);  //注册
	app.post('/Login', _modu.Login.post);  //登陆


	// ###### Wed Jan 27 17:48:05 CST 2021
	app.get('/uploadr', uploadr.upload.get);
	app.post('/uploadr', upload.single('pdf'), uploadr.upload.post);
	app.put('/uploadr', uploadr.upload.put);

	// ###### Thu May 13 15:28:18 CST 2021
	// 拆解 pdf
	app.post('/pdf', uploadr.devpdf.post);
	app.post('/memo', uploadr.memo.post);

	// ###### Tue May 11 15:47:54 CST 2021 push mail
	app.post('/mail', moted.mail.post);

	// ###### Thu Jun 3 17:09:41 CST 2021 
	app.post('/wxtoken', wx.wxtoken.post); // 获取微信 ass token
	app.post('/qr', wx.qr.post); // 获取微信 公众号长期二维码
	app.post('/DzGzqrCode', wx.DzGzqrCode.post); // 2022 1 7 获取微信 公众号长期二维码

	app.get('/DzGzqrStatus', wx.DzGzqrStatus.get); // 2022 1 7 获取微信 公众号长期二维码
	app.post('/DzGzqrStatus', wx.DzGzqrStatus.post); // 2022 1 7 获取微信 公众号长期二维码

	// ###### Fri Jul 30 16:18:10 CST 2021
	app.get('/miniwx', wx.miniwx.get); // 小程序客服
	app.post('/miniwx', wx.miniwx.post); // 小程序客服

	
	app.get('/qiyetest', wx.qiyetest.get); // 小程序客服

	app.get('/lay', wx.lay.get); // 短链链接到 打开微信小程序
	app.post('/lay', wx.lay.post); // 短链链接到 打开微信小程序
	app.get('/cay', wx.cay.get); // 短链链接到 打开微信小程序
	app.post('/cay', wx.cay.post); // 短链链接到 打开微信小程序

	// 20210903
	app.get('/getminiqrcode', wx.getminiqrcode.get);
	app.post('/getminiqrcode', wx.getminiqrcode.post); // 获取大正官方微商城的小程序码
	app.post('/getCminiqrcode', wx.getCminiqrcode.post); // 获取精选商城的小程序码
	app.post('/wxminitoken', wx.wxminitoken.post); //获取小程序 token
	app.post('/cwxminitoken', wx.cwxminitoken.post) //c端微信小程序的 获取token（非登录token）
	
	app.post('/dyms', dy.dyms.post); //抖音的 消息获取推送

	// app.get('/fstest', fstest.fs.get);

	// 20230317 服务器迁移+重整服务内容
	// 公众号消息推送服务
	app.get('/ms', ms.msu.get);
	app.post('/ms', ms.msu.post);

	// 20230830 增加qm 配置
	app.get('/qm.api.conf/ajax', wx.api.get);
	app.post('/qm.api.conf/ajax', wx.api.post);
}