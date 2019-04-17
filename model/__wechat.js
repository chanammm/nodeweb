var mongoose = require('mongoose');

var _wechat = new mongoose.Schema({
	e: String
});

module.exports = mongoose.model('wechat', _wechat, 'wechat');  //第三参数缺失的话会自动生成第一参数的复数做为表名