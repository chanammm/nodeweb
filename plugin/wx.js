const requestFn = require('request');
module.exports.wxtoken = {  // 获取 wx access_token 有效期 2小时   后期这里做中台 再做时间处理
    post:function(req, res, next){
        let appid = 'wx13652cfde0f22176'
        let secret = 'c3da68d9451c3896caff0d1aab6c28aa'
        requestFn({url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,method: 'get'}, (error, response, body) => {      
            if(error) {
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
    post:function(req, res, next){
        requestFn({url: `https://uin8.com/wxtoken`,method: 'post'}, (error, response, body) => {      
            if(error) {
                res.send({
                err: JSON.stringify(body)
                });
            }
            
            requestFn({url: `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${JSON.parse(body).msg}`, method: 'post', body: JSON.stringify({
                "action_name": "QR_LIMIT_STR_SCENE",
                "action_info": {
                    "scene": {
                        "scene_str": "452daf32e64b327f"
                    }
                }
            }), headers: {'Content-Type': 'application/json'}}, (error, response, body) => {
                if(error) {
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