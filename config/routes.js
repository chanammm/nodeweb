// JavaScript Document
var PluginUser = require('../plugin/user');
var PluginBlog = require('../plugin/blog');

module.exports = function (app){

	app.use(function (req, res, next){
		var user = req.session.user;
		if(user){
			app.locals.user = user;
		}else{
			app.locals.user = user;
		};
		
		next();
	});


	app.get('/', function (req, res, next){
		res.render('index', { title: '首页' });
	});
	
	//登录
	app.get('/login', PluginUser.loginNo, PluginUser.login.get);
	app.post('/login', PluginUser.login.post);

}