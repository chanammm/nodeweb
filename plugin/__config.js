var Model_data = require('../model/__data');

const __config = require('../public/json/configuraction.json');
module.exports.__MUDO = {
    get:function(req,res,next){
		res.render('__MUDO',{
			title:'测试页面',
			follow:{
				age:18
			}
		})
	},
    postData:function(req,res,next){
        //this is post uri
        res.send(__config);
    }
};

module.exports.__SignaTures = {
	views:function(req,res,next){
		res.render('test-active',{
			title:'this is signatures~',
			value:{
				developer:'cnzmg',
				author:'cnzmg',
				age:18,
				address:'CN-GZ'
			}
		})
	}
}

module.exports.__mbox = {
	views:function(req,res,next){
		res.render('mbox',{
				title:'成功'
		});
//		var datalist = Model_data.find({}, null,{ sort: { _id: -1} }).populate('data');  //查询用户表
//		
//		datalist.exec(function(err,_val){
//			console.log(_val);
//			res.render('mbox',{
//				title:'super version cnzmg Popups！',
//				value:_val
//			});
//		});
	},
	viewpost:function(req,res,next){
		var val = req.body;
		var postData = {
			connectStart:val.connectStart,
			connectEnd:val.connectEnd,
			decodedBodySize:val.decodedBodySize,
			domainLookupEnd:val.domainLookupEnd,
			domainLookupStart:val.domainLookupStart,
			duration:val.duration,
			encodedBodySize:val.encodedBodySize,
			entryType:val.entryType,
			fetchStart:val.fetchStart,
			initiatorType:val.initiatorType,
			name:val.name,
			nextHopProtocol:val.nextHopProtocol,
			redirectEnd:val.redirectEnd,
			redirectStart:val.redirectStart,
			requestStart:val.requestStart,
			responseEnd:val.responseEnd,
			responseStart:val.responseStart,
			secureConnectionStart:val.secureConnectionStart,
			serverTiming:val.serverTiming,
			startTime:val.startTime,
			transferSize:val.transferSize,
			workerStart:val.workerStart,
			
			domComplete:val.domComplete,  //解析dom树耗时
			domInteractive:val.domInteractive,  //解析dom树耗时
			domContentLoadedEventEnd :val.domContentLoadedEventEnd, //domready时间 
			navigationStart:val.navigationStart,  //domready时间 
			loadEventEnd:val.loadEventEnd,  //onload时间
			navigationStart:val.navigationStart  //onload时间
		};

		Model_data.create(postData,function(err,_data){
			req.session.data = _data; //添加数据
			res.send({
				successful:200,
				data:postData
			});
		})
	}
}

module.exports.__yellow = {
	post:function(req,res,next){
		res.send({
			code:2000,
			msg:{
				tip:'this is yellow',
				body:req.body
			}
		});
	}
}


//app
module.exports.viewapp = {
	get:function(req,res,next){
		res.render('app',{
			code:2000,
			msg:{
				tip:'this is yellow',
				body:req.body
			}
		});
	}
}


//chartgood views 
module.exports.chartgood = {
	get:function(req,res,next){
		res.render('ChartGood',{
			title:'this is chart'
		})
	},
	post:function(req,res,next){
		console.log(req.body);
		res.send({
			code:200,
			msg:'successful !',
			data:req.body
		})
	}
}

//_buff animate
module.exports._buff = {
	view:function(req,res,next){
		res.render('_buff',{
			title:'this is buffle',
			msg:'2'
		})
	}
}


//loading 
module.exports.loading = {
	view:function(req,res,next){
		res.render('loading',{
			title:'this is loading'
		})
	}
}

//d3
module.exports.d3 = {
	view:function(req,res,next){
		res.render('technology/d3js');
	}
}

//parnter
module.exports.partner = {
	view:function(req,res,next){
		res.render('technology/tx_partner');
	}
}