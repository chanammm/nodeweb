var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");  //数据库服务
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

//var routes = require('./config/routes');
//默认路由
var routes = require('./config/routes');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var r = require('./routes/test');
// var x = require('./routes/colorpice');
// var car_index = require('./routes/car_index');
// var mbox = require('./routes/mbox');
// var active = require('./routes/test-active');
// var car_garage = require('./routes/car_garage');
// var car_find = require('./routes/car_find');
// var loading = require('./routes/loading');
var app = express();

//建立操作数据库
//mongoose.connect("mongodb://localhost:27017/mongodb");
mongoose.connect("mongodb://localhost:27017/mongodb");   //读取写入

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'htm');
app.engine('.htm', require('ejs').renderFile);


app.use(logger('dev'));
app.use(bodyParser.json({limit: 100000}));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret:"45454",
	store:new MongoStore({
		url:'mongodb://localhost:27017/mongodb',   //链表地址
		cookieSecret:'jdghjf',
		db:'db',
		host:'localhost'
	})
}))


app.all('*', function (req, res, next) {   //解决跨域问题
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});


routes(app);
//默认路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/test',r);
// app.use('/colorpice',x);
// app.use('/car_index',car_index);
// app.use('/mbox',mbox);
// app.use('/test-active',active);
// app.use('/car_garage',car_garage);
// app.use('/car_find',car_find);
// app.use('/loading',loading);
//routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});


module.exports = app;
//var express = require('express');
//var app = express();
//var request = require('request');
//var cheerio = require('cheerio);
//app.get('/',function(req,res,next){
//  request(url,function(error,response,body){
//  if(!error && response.statusCode == 200){
//      $ = cheerio.load(body);
//      res.json({
//          'Classnum':class
//      })
//  }
//})
//})
//app.listen(3000)
