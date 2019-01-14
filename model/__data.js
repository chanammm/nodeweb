var mongoose = require('mongoose');

var _data = new mongoose.Schema({
    time: String,
	data: String,
	val:String
});

module.exports = mongoose.model('data', _data);