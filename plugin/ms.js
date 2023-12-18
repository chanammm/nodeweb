const requestFn = require('request');
const fxl = require('fast-xml-parser'); // xml 脚本
module.exports.msu = {
    post: function(req, res, next) {
        // console.log(req.query.openid);
        // req.rawBody
        // let appid = 'wx2aae0d07d44f7bad'
        // let secret = '2b34c7f8b721ca12292b2f5d5d6e8621'
        let appid = 'wx13652cfde0f22176'  // 大正微信公众号
        let secret = 'c3da68d9451c3896caff0d1aab6c28aa'
        console.log(fxl.parse(req.rawBody))
        if (fxl.parse(req.rawBody).xml['Event'] == 'unsubscribe') {
        console.log('取消关注了')
        res.send();
        } else if(fxl.parse(req.rawBody).xml['Event'] == 'subscribe' || fxl.parse(req.rawBody).xml['Event'] == 'SCAN') {  // 关注或者扫码操作 不严谨  目前只是 传奇
            // "lkSg7YcEsVn2q9kDS7ibPzyrQNx1t8AZa1njhn01iFU"  // 微信固定的媒体ID
            if (fxl.parse(req.rawBody).xml['EventKey'] == "452daf32e64b327f" || fxl.parse(req.rawBody).xml['EventKey'] == "qrscene_452daf32e64b327f") {
            requestFn({url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,method: 'get'}, (error, response, body) => {
                requestFn({url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+ JSON.parse(body).access_token,method: 'post', body: JSON.stringify({
                touser: req.query.openid,
                msgtype: 'text',
                text: {
                    content: ` 感谢关注大正集团，\n 有我让你开店更简单~\n 点击下方菜单获取产品详细视频：\n <a href="http://s.coffeedz.com/keeper/vid/#/customized?qr=40c8546df3eca5ed.6"> 传奇视频 </a>\n （外观，操作，安装，保养）↓↓↓\n大正集团服务热线： <a href="tel:400-883-4300">400-883-4300</a>`
                }
            }), headers: {'Content-Type': 'application/json'}}, (error, response, body) => {
                    console.log(body)
                })

            //   requestFn({url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+ JSON.parse(body).access_token,method: 'post', body: JSON.stringify({
            //     touser: req.query.openid,
            //     msgtype: 'text',
            //     text: {
            //         content: `↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓\n<a href="http://s.coffeedz.com/teach/">戳我获取你的专属冲泡教程</a>`
            //     }
            // }), headers: {'Content-Type': 'application/json'}}, (error, response, body) => {
            //       console.log(body)
            //   })
            //   requestFn({url: 'https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token='+ JSON.parse(body).access_token,method: 'post', body: JSON.stringify({
            //     type: 'image',
            //     offset: 0,
            //     count: 20
            // }), headers: {'Content-Type': 'application/json'}}, (error, response, body) => {
            //       console.log(body)
            //   })
                // requestFn({url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+ JSON.parse(body).access_token,method: 'post', body: JSON.stringify({
                //     touser: req.query.openid,
                //     msgtype: 'image',
                //     image: {
                //       media_id: "lkSg7YcEsVn2q9kDS7ibPzyrQNx1t8AZa1njhn01iFU"
                //     }
                //   }), headers: {'Content-Type': 'application/json'}}, (error, response, body) => {
                //       console.log(body)
                //   })
            })
        } else if (fxl.parse(req.rawBody).xml['EventKey'] == "dz_hash_iot") {// iot 登录       
            requestFn({
            url: 'https://uin8.com/DzGzqrStatus',
            method: 'get'
            },
            (error, response, body) => {
            console.log(body)
            })
            res.send();
        } else if (/dz_hash_mkting/.test(fxl.parse(req.rawBody).xml['EventKey'])) {// 营销工具的扫码登录   
            let posData = fxl.parse(req.rawBody)
            posData['account'] = fxl.parse(req.rawBody).xml['EventKey'].split(',')[1]
            requestFn({
            url: 'https://coffeedz.com/mkting/api/callback',
            method: 'post',
            body: JSON.stringify(posData), headers: {'Content-Type': 'application/json'}},
            (error, response, body) => {
            console.log(body)
            })
            requestFn({url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,method: 'get'}, (error, response, body) => {        
            requestFn({url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+ JSON.parse(body).access_token,method: 'post', body: JSON.stringify({
                touser: req.query.openid,
                msgtype: 'text',
                text: {
                    content: ` 感谢使用\n 使用过程中如有疑问请提工单\n<a href="http://www.uin8.com">提交反馈</a>`
                }
            }), headers: {'Content-Type': 'application/json'}}, (error, response, body) => {
                    console.log(body)
                })
            })
            res.send();
        } else {
            requestFn({url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,method: 'get'}, (error, response, body) => {        
            requestFn({url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+ JSON.parse(body).access_token,method: 'post', body: JSON.stringify({
                touser: req.query.openid,
                msgtype: 'text',
                text: {
                    content: ` 感谢关注大正集团，\n 有我让你开店更简单~\n 点击下方菜单获取产品详细视频：\n <a href="http://s.coffeedz.com/keeper/vid/"> 查看视频 </a>\n （外观，操作，安装，保养）↓↓↓\n大正集团服务热线： <a href="tel:400-883-4300">400-883-4300</a>`
                }
            }), headers: {'Content-Type': 'application/json'}}, (error, response, body) => {
                    console.log(body)
                })
            })
        }
        res.send();
        } else if(fxl.parse(req.rawBody).xml['Event'] == 'CLICK' && fxl.parse(req.rawBody).xml['EventKey'] == '13'){
        console.log('点击菜单事件');
        requestFn({url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,method: 'get'}, (error, response, body) => {        
            requestFn({url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+ JSON.parse(body).access_token,method: 'post', body: JSON.stringify({
                touser: req.query.openid,
                msgtype: 'text',
                text: {
                    content: `售后报修热线欢迎拨打：<a href="tel:400-883-4300">400-883-4300</a>`
                }
            }), headers: {'Content-Type': 'application/json'}}, (error, response, body) => {
                    console.log(body)
                })
            })
            res.send();
        }else {
        console.log('其他事件');
        // if (/[452daf32e64b327f]|[qrscene_452daf32e64b327f]/g.test(req.rawBody)) {
        //   requestFn({url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,method: 'get'}, (error, response, body) => {        
        //     requestFn({url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+ JSON.parse(body).access_token,method: 'post', body: JSON.stringify({
        //         touser: req.query.openid,
        //         msgtype: 'text',
        //         text: {
        //             content: ` 感谢关注大正集团，\n 有我让你开店更简单~\n 点击下方菜单获取产品详细视频：\n <a href="http://s.coffeedz.com/keeper/vid/#/customized?qr=452daf32e64b327f"> 传奇视频 </a>\n （外观，操作，安装，保养）↓↓↓\n大正集团服务热线： <a href="tel:400-883-4300">400-883-4300</a>`
        //         }
        //     }), headers: {'Content-Type': 'application/json'}}, (error, response, body) => {
        //           console.log(body)
        //       })
        //   })
        // }  else {
        //   requestFn({url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,method: 'get'}, (error, response, body) => {        
        //     requestFn({url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+ JSON.parse(body).access_token,method: 'post', body: JSON.stringify({
        //         touser: req.query.openid,
        //         msgtype: 'text',
        //         text: {
        //             content: ` 感谢关注大正集团，\n 有我让你开店更简单~\n 点击下方菜单获取产品详细视频：\n <a href="http://s.coffeedz.com/keeper/vid/"> 查看视频 </a>\n （外观，操作，安装，保养）↓↓↓\n大正集团服务热线： <a href="tel:400-883-4300">400-883-4300</a>`
        //         }
        //     }), headers: {'Content-Type': 'application/json'}}, (error, response, body) => {
        //           console.log(body)
        //       })
        //   })
        // }
        res.send();
        }
    },
    get: function(req, res, next) {
        res.send(req.query.echostr);
    }
}