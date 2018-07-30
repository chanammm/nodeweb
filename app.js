var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

//var routes = require('./config/routes');
//默认路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var r = require('./routes/test');
var x = require('./routes/colorpice');
var renlian = require('./routes/renlian');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'htm');
app.engine('.htm', require('ejs').renderFile);  

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//默认路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test',r);
app.use('/colorpice',x);
app.use('/renlian',renlian);
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
