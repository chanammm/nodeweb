
var request = require('request');
// 任务定时器
const schedule = require('node-schedule');

module.exports.wechatMessage = {
	post: function (req, res, next){
		// 模板ID 0SwJca8FeK7isMoY225yYFk6SaF5ZaQ40wprYQBX3AA
		// 获取app token 
		// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
		// 订阅消息推送
		// https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=ACCESS_TOKEN
		// access_token			<string>		是		接口调用凭证
		// touser				<string>		是		接收者（用户）的 openid
		// template_id			<string>		是		所需下发的订阅模板id
		// page					<string>		否		点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
		// data					<Object>		是		模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
		// miniprogram_state	<string>		否		跳转小程序类型：developer为开发版；trial为体验版；formal为正式版；默认为正式版
        // lang					<string>		否		进入小程序查看”的语言类型，支持zh_CN(简体中文)、en_US(英文)、zh_HK(繁体中文)、zh_TW(繁体中文)，默认为zh_CN
        
		request({url: "https://api.weixin.qq.com/sns/jscode2session?appid=wxea82f54aaba948f9&secret=b7c088768a04e87c8b4989bd943ce3d7&js_code="+ req.body.code +"&grant_type=authorization_code",method: 'get',headers:{
			'Content-Type': 'application/json'
		}}, function (error, response, body) {
            let openid = JSON.parse(body).openid;

        // let openid = "oF1Fa5DMlxLYm7PrGJ8VemENo3do";//目前仅仅个人 openid 提醒， 后期用户授权 存库openid
        //每分钟的第30秒定时执行一次:
        schedule.scheduleJob('30 30 9 * * *',()=>{
            request({url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxea82f54aaba948f9&secret=b7c088768a04e87c8b4989bd943ce3d7",method: 'get',headers:{
				'Content-Type': 'application/json'
			}}, function (error, response, body) {
				request({url: "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token="+ JSON.parse(body).access_token,method: 'POST', body:JSON.stringify(
					{
						touser: openid,
						template_id: "0SwJca8FeK7isMoY225yYFk6SaF5ZaQ40wprYQBX3AA",
						page: "/pages/index/index",
						data: {
							"thing1": {
								"value": "生日卡"
							},
							"time2": {
								"value": "2020年5月21日"
							},
							"thing3": {
								"value": "软软"
							} ,
							"thing4": {
								"value": "生日打卡"
							}
						},
						miniprogram_state: "formal",
						lang: "zh_CN",
					}
				),headers:{
					'Content-Type': 'application/json'
				}}, function (error, response, body) {
                    console.log(body);
					// res.send({
					// 	code:200,
					// 	msg:'get request successful !',
					// 	body: JSON.parse(body)
					// })
				})

			})
        }); 
        res.send({
            code:200,
            msg:'get request successful !',
        })

		})
	}
}