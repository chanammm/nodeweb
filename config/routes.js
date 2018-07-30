module.exports = function(app){
	app.set('/', function(req, res, next){
		res.send("欢迎来到这里，现时的世界呢~");
		//res.render('routes',{title,"help"});
	})
}
