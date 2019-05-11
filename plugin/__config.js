var Model_data = require('../model/__data');
//var Model_wechat = require('../model/__wechat');
//var Model_qrcode = require('../model/__qrcode');
//var Model_state = require('../model/__state');
var Model_questionnaire = require('../model/__xml');
//var request = require('request');

//const { Wechaty } = require('wechaty');
//const bot = new Wechaty({ name: 'cnzmg' });

var nodeExcel = require('excel-export');  //引入excel 模块



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

//mongo
module.exports.mongo = {
	view:function(req,res,next){
		res.render('technology/mongo',{
			title:'this is mongo'
		});
	}
}


//ksx Analog interface
//module.exports.interface = {
//	get:function(req, res, next){
//		// get request
//		let open = 'http://rap2api.taobao.org/app/mock/164781/' + req.query.type;
//		
//		request({url: open,method: 'get',headers:{
//			'Content-Type': 'application/json'
//		}}, function (error, response, body) {
//			res.send({
//				code:200,
//				msg:'get request successful !',
//				b: JSON.parse(body),
//				e: JSON.parse(error)
//			})
//		})
//	},
//	post:function(req, res, next){
//		// post require http://rap2api.taobao.org/app/mock/164781/login
//		let open = 'http://rap2api.taobao.org/app/mock/164781/' + req.body.type;
//		let data = JSON.stringify(req.body), code = Object;
//
//		try {
//			request({url: open,method: 'POST',body: data,headers:{
//				// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//				'Content-Type': 'application/json'
//			}}, function (error, response, body) {
//				code = {
//					code:200,
//					msg:'post require successful',
//					b: JSON.parse(body),
//					e: JSON.parse(error)
//				}
//			})
//		} catch (error) {
//			code = {
//				code:200,
//				msg:'post require Error'
//			}
//		}
//		res.send(code)
//	}
//}

//wechat 
//module.exports.wechat = {
//	post:function(req, res, next){
//		Model_wechat.find({}, async function(err, e){
//			res.send({
//				code:200,
//				msg: await e
//			})
//		})
//	}
//}

//wechat api
//module.exports._wechat = {
//	get: function(req,res){
//		Model_state.find({}, async function(err, e){
//			res.send({
//				code:200,
//				msg: await e
//			})
//		})
//	},
//	post: async function(req,res){
//		Model_qrcode.find({}, async function(err, data){
//			if(err) throw err;
//			await res.send({
//				code:200,
//				_qrcode: data
//			})
//		})
//	}
//}


module.exports.questionnaire = {
	get:async function(req, res, next){
		Model_questionnaire.find({}, function(err, data){
			res.render('technology/questionnaire',{
				title: '问卷统计',
				data:{
					msg: "Request type 'Method POST'",
					code: {
						Question: JSON.stringify(data)
					}
				}
			})
		})
	},
	post:function(req, res, next){
		let postData = {};
		req.body.question.forEach((_value, index) => {
			postData['Question_'+ (index + 1)] = _value;
		})
		postData['YmUserId'] = req.body.YmUserId;
		postData['YmUserToken'] = req.body.YmUserToken;
		
		postData['DataTime'] = new Date().getTime();

		Model_questionnaire.find({YmUserId: req.body.YmUserId}, function(err, user){
			if (err) {
				res.send({
					successful:400,
					data:{
						msg: '异常错误',
						code: 409
					}
				});
				return false
			}else{
				if(user.length != 0){
					res.send({
						successful:400,
						data:{
							msg: '重复提交',
							code: 309
						}
					});
					return false
				}else{
					Model_questionnaire.create(postData,function(err,_data){
						if (err) {
							res.send({
								successful:400,
								data:{
									msg: '提交失败',
									code: 809
								}
							});
							return false
						}else{
							req.session.data = _data; //添加数据
							res.send({
								successful:200,
								data:postData
							});
						}
					})
				}
			}
		})
	}
}

//导出 问卷
module.exports.Squestionnaire = {
	get: function(req, res, next){
		var conf = {};//创建一个写入格式map，其中cols(表头)，rows(每一行的数据);
		var cols = ['第一题', '第二题', '第三题', '第四题', '第五题', '第六题', '第七题', '第八题', '第九题', '第十题', '第十一题', '第十二题', '第十三题', '第十四题', '第十五题'];//手动创建表头中的内容
		conf.cols = [];//在conf中添加cols
 
		for (var i = 0; i < cols.length; i++) {
			var tits = {};//创建表头数据所对应的类型,其中包括 caption内容 type类型
			tits.caption = cols[i];//添加内容
			tits.type = 'string';//添加对应类型，这类型对应数据库中的类型，入number，data但一般导出的都是转换为string类型的
			conf.cols.push(tits);//将每一个表头加入cols中
		}
		Model_questionnaire.find({}, function (err, data) {//根据需求查询想要的字段
			var tows = ['Question_1', 'Question_2', 'Question_3', 'Question_4', 'Question_5', 'Question_6', 'Question_7', 'Question_8', 'Question_9', 'Question_10', 'Question_11', 'Question_12', 'Question_13', 'Question_14', 'Question_15'];//创建一个和表头对应且名称与数据库字段对应数据，便于循环取出数据
			var datas = [];//用于承载数据库中的数据
			let towsLen = tows.length
			let dataLen = data.length
			for (var i = 0; i < dataLen; i++) {//循环数据库得到的数据，因为取出的数据格式为
				//[{"id" : "101010100","provinceZh" : "北京","leaderZh" : "北京","cityZh" : "北京","cityEn" : "beijing"},{…………},{…………}]
				let row = [];//用来装载每次得到的数据
				for (let j = 0; j < towsLen; j++) {//内循环取出每个
					row.push(data[i][tows[j]].toString());//row.push((data[i].tows[j]).toString());两种形式都是相同的
				}
				datas.push(row);//将每一个{ }中的数据添加到承载中
			}
			conf.rows = datas;//将所有行加入rows中
			var result = nodeExcel.execute(conf);//将所有数据写入nodeExcel中
			res.setHeader('Content-Type', 'application/vnd.openxmlformats');//设置响应头
			//设置下载文件命名 支持的excel文件类有.xlsx .xls .xlsm .xltx .xltm .xlsb .xlam等
			res.setHeader("Content-Disposition", "attachment; filename=Questionnaire_"+ new Date().getTime() +".xlsx");
			res.end(result, 'binary');//将文件内容传入
		});
	}
}