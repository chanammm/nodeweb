const requestFn = require('request');
var Model_state = require('../model/__state');

// 20230830 增加启梦的公众号token 获取
const axios = require('request');
var schedule = require('node-schedule');
const crypto = require('crypto');
var unit = require('../unit/index');
// 独立获取 每小时的59分59秒自动获取 企业微信应用【大正咖啡集团工具箱】的应用token
var rule = new schedule.RecurrenceRule();
rule.minute = 59;
rule.second = 59;
schedule.scheduleJob(rule, function(){ _getToken();});
function _getToken () {
    let appid = 'wx5a9f6992d9c71d2f'
    let secret = 'c5b7702b6012c343648f7927068647ff'
    axios({
        url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`, method: 'get'}, (error, response, body) => {
        if (error) {
            // res.send({
            //     code: 4008,
            //     LbnData: '获取token出错'
            // });
            console.log(error)
            return
        }
        token = JSON.parse(body).access_token;
        global.token = token;
        // 增加获取 jsapi_ticket 时效 7200 s
		axios({
			url: `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${ token }&type=jsapi`, method: 'get'}, (error, response, body) => {
			if (error) {
				res.send({
					code: 4008,
					LbnData: '获取ticket出错'
				});
				return
			}
			jsapi_ticket = JSON.parse(body).ticket;
			global.jsapi_ticket = jsapi_ticket;
		})
    })
}
if (!global.token) { _getToken()}
// 20230830 增加启梦的公众号token 获取

module.exports.wxtoken = {  // 获取 wx access_token 有效期 2小时   后期这里做中台 再做时间处理
    post: function (req, res, next) {
        let appid = 'wx13652cfde0f22176' // 大正集团的公众号
        let secret = 'c3da68d9451c3896caff0d1aab6c28aa'
        requestFn({ url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`, method: 'get' }, (error, response, body) => {
            if (error) {
                res.send({
                    err: JSON.stringify(body)
                });
            }
            res.send({
                code: 200,
                msg: JSON.parse(body).access_token,
                md: JSON.stringify(body)
            })
        })
    }
}
module.exports.wxminitoken = {  // 获取 wx mini access_token 有效期 2小时   后期这里做中台 再做时间处理
    post: function (req, res, next) {
        let appid = 'wx3753d9c28137c56d' // 这里是大正官方微商城
        let secret = '4565240b8f0a15c38330f43def2c499a'
        requestFn({ url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`, method: 'get' }, (error, response, body) => {
            if (error) {
                res.send({
                    err: JSON.stringify(body)
                });
            }
            res.send({
                code: 200,
                msg: JSON.parse(body).access_token
            })
        })
    }
}

module.exports.cwxminitoken = {  // 获取 c 端商城 wx mini access_token 有效期 2小时  后期这里做中台 再做时间处理
    post: function (req, res, next) {
        let appid = 'wx1d51e2bd75fed3d1' // 这里是精选商城
        let secret = '7ff39af1d6f2a6c55b835587431190f1'
        requestFn({ url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`, method: 'get' }, (error, response, body) => {
            if (error) {
                res.send({
                    err: JSON.stringify(body)
                });
            }
            res.send({
                code: 200,
                msg: JSON.parse(body).access_token
            })
        })
    }
}

module.exports.qr = {  // 获取 wx 长期公众号二维码
    post: function (req, res, next) {
        requestFn({ url: `http://uin8.com/wxtoken`, method: 'post' }, (error, response, body) => {
            if (error) {
                res.send({
                    err: JSON.stringify(body)
                });
            }

            requestFn({
                url: `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${JSON.parse(body).msg}`, method: 'post', body: JSON.stringify({
                    "action_name": "QR_LIMIT_STR_SCENE",
                    "action_info": {
                        "scene": {
                            "scene_str": "452daf32e64b327f"
                        }
                    }
                }), headers: { 'Content-Type': 'application/json' }
            }, (error, response, body) => {
                if (error) {
                    res.send({
                        err: JSON.stringify(body)
                    });
                }
                res.send({
                    code: 200,
                    msg: "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + JSON.parse(body).ticket
                })
            })
        })
    }
}

module.exports.DzGzqrCode = {  // 获取 wx 大正集团 长期公众号二维码
    post: function (req, res, next) {
        requestFn({ url: `http://uin8.com/wxtoken`, method: 'post' }, (error, response, body) => {
            if (error) {
                res.send({
                    err: JSON.stringify(body)
                });
            }
            requestFn({
                url: `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${JSON.parse(body).msg}`, method: 'post', body: JSON.stringify({
                    "action_name": "QR_STR_SCENE",
                    "expire_seconds": 3000,
                    "action_info": {
                        "scene": {
                            "scene_str": "dz_hash_iot"
                        }
                    }
                }), headers: { 'Content-Type': 'application/json' }
            }, (error, response, body) => {
                // ToUserName: 'gh_cd51173e6d8a', 开发者ID
                // FromUserName: 'oIUsX05E7ZYKhmHWruWrryLxLURE',  发送方的OPENID
                // CreateTime: 1645430889, 创建时间 时间戳
                // MsgType: 'event', 消息类型
                // Event: 'SCAN', 事件类型
                // EventKey: 'dz_hash_iot', 事件KEY值，是一个32位无符号整数，即创建二维码时的二维码scene_id
                // Ticket: 'gQEI7zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyYlQ5OGd2eGJjbmoxNHRramh5YzEAAgRlSBNiAwS4CwAA', 二维码的ticket，可用来换取二维码图片
                // Encrypt: '+LZMyGbQrG/ZuhFX0cXnTvrjYhMJ81BtA4Im6iEDM6MgnNFsp20+QJ5GqmOqK/0vKl+b9OuAsAVNGLrHz70zrnS2TJTZz7ZIxTsTPZCG30bt+qN9NLFMX7FHygNeEz6nwrpl2m+cG1qOps+mh5LejBXuGAwatHiXSMM7mbuT7G61U2kziWXXcmtNG5wQUT5+pCK/ylv0HWehsDpWilE1+2qQUuuOU7ZUGEzSbujwNGvimuAr262nLFrmGtwxxfkjomYUwmsTcQaWrIlACCYMydY7y+wbNGN01+Ff4zKr2k1wcifAEM8D7ZwkObu1BUSvvzVKmFUB2rMYzGYnjFPl94O9qHjK0+OiPx6mH4zQM0zHX8S+9tQULDp/6QwGU34rIwZ6dBtXorQ83lZ1ybfBjkAYh5xotpb3HGoh18+yoMnlpOHjj/KIAwVnSkrcQ7l5QylXZRgNSEi9ugeipgvM/p67XHhqDcMgVER0gSkSSMKHyINVhP3nS1vNQITmJKfksvNIiuVkiSrH+VoDCSe2TF0NaEjArbwI5CJOI32aYoGfhQTKS+GZDqLUTlHgdnUyRRYjm644Yx/iYb3ts6mYVIYGS22vhMrg03Xs9lDDM4BpwVFLq+qKN5ehHhWfdnPl'
                if (error) {
                    res.send({
                        err: JSON.stringify(body)
                    });
                }
                console.log(JSON.stringify(body))
                res.send({
                    code: 200,
                    msg: "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + JSON.parse(body).ticket
                })
            })
        })
    }
}

module.exports.DzGzqrStatus = {
    get: function (req, res, next) {
        Model_state.find({}, function(err, data){
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
				if(data.length != 0){
					Model_state.update({
						status: false
					}, {
						$set: {
							status: true
						}
					}, function (err){
						let resJson = {};
						if(err) {
							resJson.data = '更新失败';
                            resJson.bool = false;
							resJson.status = 300;
						}else{
                            resJson.bool = true;
							resJson.status = 200;
						}
						res.send(resJson);
					});
				}else{
					Model_state.create({
                        status: true,
                        timer: new Date().getTime()
                    },function(err,_data){
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
								bool: true
							});
						}
					})
				}
			}
		})
    },
    post: function (req, res, next) {
        Model_state.find({}, function(err, data){
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
                let bool = false
                if (data.length < 1) {
                    bool = false
                } else {
                    bool = data[0].status
                    if (data[0].status) {
                        Model_state.update({
                            status: true
                        }, {
                            $set: {
                                status: false
                            }
                        }, function (err){
                            console.log(err)
                        });
                        Model_state.find({}, function(err, data) {
                            console.log(data)
                        })
                    }
                }
                res.send({
					successful:200,
					bool: bool
				});
			}
		})
    }
}

module.exports.miniwx = {  // 小程序客服 测试获取到的是数据
    get: function (req, res, next) {
        console.log(req.query.echostr) 
        res.send(req.query.echostr)
    },
    post: function (req, res, next) {
        console.log(req.body)
        res.send({
            code: 200
        })
    }
}

module.exports.getminiqrcode = {  // 官方微商城 商品的详情小程序码
    get: function (req, res, next) {
        res.render('getminiqrcode')
    },
    post: function (req, res, next) {
        requestFn({ url: `http://uin8.com/wxminitoken`, method: 'post' }, (error, response, body) => {
            if (error) {
                res.send({
                    err: JSON.stringify(body)
                });
            }
            requestFn({
                url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${JSON.parse(body).msg}`, method: 'post', body: JSON.stringify({
                    "scene": encodeURI('goods_id='+ req.body._buff)
                }), headers: { 'Content-Type': 'application/json'}, encoding: null // 重点参数
            }, (error, response, body) => {
                if (error) {
                    res.send({
                        err: JSON.stringify(body)
                    });
                    return
                }
                res.send(body)
            })
        })
    }
}
module.exports.getCminiqrcode = {  // 精选商城 商品的详情小程序码
    post: function (req, res, next) {
        requestFn({ url: `http://uin8.com/cwxminitoken`, method: 'post' }, (error, response, body) => {
            if (error) {
                res.send({
                    err: JSON.stringify(body)
                });
            }
            requestFn({
                url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${JSON.parse(body).msg}`, method: 'post', body: JSON.stringify({
                    "scene": encodeURI('goods_id='+ req.body._buff)
                }), headers: { 'Content-Type': 'application/json'}, encoding: null // 重点参数
            }, (error, response, body) => {
                if (error) {
                    res.send({
                        err: JSON.stringify(body)
                    });
                    return
                }
                res.send(body)
            })
        })
    }
}

// test
module.exports.qiyetest = {  // 企业微信消息推送设置
    get: function (req, res, next) {
        let timer = new Date().toLocaleString()
        requestFn({ url: `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wwf4d2047b935fed42&corpsecret=Yo0udq0w8d7v-BmNj5SoRnmcQUbfuJ6LsbMJYWqyij0`, method: 'get' }, (error, response, body) => {
            let message = {
                "touser" : "ChenZhiMeng",
                "msgtype" : "text",
                "agentid" : 1000026,
                "text" : {
                    "content" : `<a href='uin8.com'>我就试一下</a>\n来了新的订单噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢哦哦\n天气好${timer}`
                },
                "safe": 0
             }
            requestFn({ url: `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${JSON.parse(body).access_token}`, method: 'post', body: JSON.stringify(message)}, 
            (error, response, body) => {
                console.log(body)
            })
        })
        res.send({
            successful:400,
            data:{
                msg: '异常错误',
                code: 409
            }
        });
    }
}

// lay
module.exports.lay = {  // 短链打开小程序 
    get: function (req, res, next) {
        res.render('lay')
    },
    post: function (req, res, next) {
        requestFn({ url: `http://uin8.com/wxminitoken`, method: 'post' }, (error, response, body) => {
            if (error) {
                res.send({
                    err: JSON.stringify(body)
                });
            }
            requestFn({
                url: `https://api.weixin.qq.com/wxa/generatescheme?access_token=${JSON.parse(body).msg}`, method: 'post', 
                headers: { 'Content-Type': 'application/json'}
            }, (error, response, body) => {
                if (error) {
                    res.send({
                        err: JSON.stringify(body)
                    });
                    return
                }
                res.send(body)
            })
        })
    }
}
// lay
module.exports.cay = {  // 短链打开小程序 
    get: function (req, res, next) {
        res.render('cay')
    },
    post: function (req, res, next) {
        requestFn({ url: `http://uin8.com/cwxminitoken`, method: 'post' }, (error, response, body) => {
            if (error) {
                res.send({
                    err: JSON.stringify(body)
                });
            }
            requestFn({
                url: `https://api.weixin.qq.com/wxa/generatescheme?access_token=${JSON.parse(body).msg}`, method: 'post', 
                headers: { 'Content-Type': 'application/json'}
            }, (error, response, body) => {
                if (error) {
                    res.send({
                        err: JSON.stringify(body)
                    });
                    return
                }
                res.send(body)
            })
        })
    }
}
// 檬吧 企业信息： corpid=ww9117b16bb30ac48e&corpsecret=tbDVRaqy-HKO-Nfq9zJDbQZEawwnYS15Czzq7WyTjXY
// 大正企业微信 应用密钥： corpid=wwf4d2047b935fed42&corpsecret=Yo0udq0w8d7v-BmNj5SoRnmcQUbfuJ6LsbMJYWqyij0

//20230830 启梦服务号的配置
var jzm = {};
var fn = function(func, params, fn){ return jzm[func](params, fn) };
var anchor = {}
jzm.config = function (data = {}) {
    anchor = {
        "_Author": data.AuthorName || "Labuy",
        "_SizeAge": data.SizeAge || '20*',
        "_Address": data.Address || "GZQMWL-",
        "_Organization": data.Organization || "GZQM-",
        "_Copyright": data.Copyright || "QM-U2KAFE:681aeedc3290n392",
        "_String": "*."
    }
    return anchor
}
// 导航栏的方法--列表
jzm['qm.post.wx.conf'] = function(params, callback){
    let sha1 = crypto.createHash('sha1');
    let timestamp = Math.floor(new Date().getTime() / 1000).toString();
    // let timestamp = new Date().getTime();
    let jsapi_ticket = global.jsapi_ticket;
    let noncestr = unit.trans.random(16);
    let url = params.url;
    console.log(jsapi_ticket)
    let signature = sha1.update(`jsapi_ticket=${ jsapi_ticket }&noncestr=${ noncestr }&timestamp=${ timestamp }&url=${ url }`).digest('hex');
    // let signature = sha1.update(`jsapi_ticket=${ jsapi_ticket }&noncestr=${ noncestr }&timestamp=${ timestamp }&url=${ url }`).digest('hex');
    callback({
        code: 200,
        LbnData: {
            appId: 'wx5a9f6992d9c71d2f',
            timestamp: timestamp,
            signature: signature,
            nonceStr: noncestr
        },
        ...jzm.config()
    })
}
// 消息通知
jzm['qm.push.message.conf'] = function(params, callback){
    axios({
        method: 'POST',
        url: `https://interface.coffeedz.cn/qy.api.conf/ajax`,
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            methodUri: 'send.zlk.conf.message',
            userName: params.userName,
            content: params.content
    })}, (error, response, body) => {
        if (error) {
            callback({
                code: 400,
                LbnData: '发送错误',
                ...jzm.config()
            })
            return
        }
        // body: JSON.stringify({
        let data = JSON.parse(body)
        if (data.code != 200) {
            callback({
                code: 200,
                LbnData: data.LbnData,
                ...jzm.config()
            })
            return    
        }
        callback({
            code: 200,
            LbnData: data,
            ...jzm.config()
        })
    })
}
// qm-api
module.exports.api = {
    get:  function (req, res, next) {
        let postData = req.query
        fn(postData.methodUri, postData, function (params) {
            res.send(params)
        })
    },
    post: function (req, res, next) {
        let postData = req.body;
        postData['timer'] = new Date().getTime();
        fn(postData.methodUri, postData, function (params) {
            res.send(params)
        })
    }
}