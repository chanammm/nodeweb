var mongoose = require('mongoose');

var _wechat = new mongoose.Schema({
	arr: String
});

module.exports = mongoose.model('wechat', _wechat);