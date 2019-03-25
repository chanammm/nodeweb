var mongoose = require('mongoose');

var _data = new mongoose.Schema({
    connectStart: String,
	connectEnd: String,
	decodedBodySize:String,
	
	domainLookupEnd: String,
	domainLookupStart: String,
	duration:String,
	
	encodedBodySize: String,
	entryType: String,
	fetchStart:String,
	
	initiatorType: String,
	name: String,
	nextHopProtocol:String,
	
	redirectEnd: String,
	redirectStart: String,
	requestStart:String,
	
	responseEnd: String,
	responseStart: String,
	secureConnectionStart:String,
	
	serverTiming: String,
	startTime: String,
	transferSize:String,
	
	workerStart: String,
	
	domComplete:String,  //解析dom树耗时
	domInteractive:String,  //解析dom树耗时
	domContentLoadedEventEnd :String, //domready时间 
	navigationStart:String,  //domready时间 
	loadEventEnd:String,  //onload时间
	navigationStart:String  //onload时间
});

module.exports = mongoose.model('data', _data);