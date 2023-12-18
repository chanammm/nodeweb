"use strict";
const axios = require('request');
const fs = require("fs");
var guid = require("guid");
const { KJUR, hextob64 } = require('jsrsasign');
const crypto = require('crypto');
/*
* 大正咖啡集团服务号信息
*/
const _plugin = {
    wxApi: 'https://api.weixin.qq.com/',
    AppID: 'wx13652cfde0f22176',
    AppSecret: 'c3da68d9451c3896caff0d1aab6c28aa',
    mchid: '1494011822',
    pem: fs.readFileSync(__dirname + '/certs/apiclient_key.pem').toString(),
    payCallBack: 'https://interface.coffeedz.cn/pay.api.conf/wxPayCallback',
    serial_no: '7E344F988E726F9316407CD94A8C15C5FBC72826',
    mchApi: 'https://api.mch.weixin.qq.com/',
    v3ApiKey: '10bd25a928e3e3ba8d4e09bb20160301'
}
/**
 * rsa签名
 */
 var SignUtil = {
    /**
     * rsa签名
     * @param content 签名内容
     * @param privateKey 私钥，PKCS#1
     * @param hash hash算法，SHA256withRSA，SHA1withRSA
     * @returns 返回签名字符串，base64
     */
    rsaSign: function (content, privateKey, hash) {
        // 创建 Signature 对象
        const signature = new KJUR.crypto.Signature({
            alg: hash,
            //!这里指定 私钥 pem!
            prvkeypem: privateKey
        })
        signature.updateString(content)
        const signData = signature.sign()
        // 将内容转成base64
        return hextob64(signData)
    },
}
function calcSign(msg) {
    return SignUtil.rsaSign(msg, _plugin.pem, "SHA256withRSA")
}
// msg为需加密内容,pem是用fs模块读取证书文件并转成字符串
function getTimeStamp() {
    return Math.round(+new Date / 1000)
}
// 返回10位时间戳
function joinMessage(...args) {
    return args.join("\n") + "\n"
}
// 将传入的参数以每行一个的形式转化成字符串
function getUUID() {
    return guid.create().value.replace(/-/g, "").slice(0, 30)
}
//AES 解密
function decodeByAES(ciphertext, key, iv, aad) {
    let rst = '';
    ciphertext = Buffer.from(ciphertext, 'base64');
    let authTag = ciphertext.slice(ciphertext.length - 16);
    let data = ciphertext.slice(0, ciphertext.length - 16);
    let decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    decipher.setAAD(Buffer.from(aad));
    rst = decipher.update(data, 'binary', 'utf8');
    try {
        rst += decipher.final('utf-8')
    } catch (error) {
        console.log(error);
    }
    return rst;
}
// 生成32位UUID
module.exports.wx = {
    getOpenid: function (code, callBack) {
        let openid = '';
        axios.get(_plugin.wxApi + `sns/oauth2/access_token?appid=${ _plugin.AppID }&secret=${ _plugin.AppSecret }&code=${ code }&grant_type=authorization_code`,
        (error, response, params) => {
            if (error) {
                openid = error;
                return;
            }
            openid = params;
            if (callBack) {
                callBack(openid);
            }
        })
        return openid;
    },
    getUserInfo: function (data, callBack) {
        let _postData = {};
        axios.get(_plugin.wxApi + `sns/userinfo?access_token=${ data.access_token }&openid=${ data.openid }&lang=zh_CN`,
        (error, response, params) => {
            if (error) {
                _postData = error;
                return;
            }
            if (callBack) {
                callBack(params);
            }
        })
        return _postData;
    },
    wxPay: function(data, callBack){
        // let nonce_str = getUUID();
        let nonce_str = data._id;
        let ts = getTimeStamp().toString();
        let reqBody = {
            mchid: _plugin.mchid,
            out_trade_no: nonce_str,
            appid: _plugin.AppID,
            description: data.client_name,
            notify_url: _plugin.payCallBack,
            amount: {
                total: parseInt(data.order_money)
            },
            payer: {
                openid: data.wx_openid
            }
        }
        let msg = joinMessage("POST", "/v3/pay/transactions/jsapi", ts, nonce_str, JSON.stringify(reqBody));
        let signature = calcSign(msg);
        let auth = `WECHATPAY2-SHA256-RSA2048 mchid="${_plugin.mchid}",nonce_str="${nonce_str}",signature="${signature}",timestamp="${ts}",serial_no="${_plugin.serial_no}"`
        axios({url: _plugin.mchApi + "v3/pay/transactions/jsapi", method: 'post', body: reqBody, 
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0',
                Authorization: auth
            },
            json: true
        }, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                if (callBack) {
                    let _package = `prepay_id=${ body.prepay_id }`;
                    let paySignMsg = joinMessage(_plugin.AppID, ts, nonce_str, _package);
                    let paySign = calcSign(paySignMsg);
                    let postData = {};
                    postData['package'] = _package;
                    postData['appId'] = _plugin.AppID;
                    postData['timeStamp'] = ts;
                    postData['nonceStr'] = nonce_str;
                    postData['signType'] = 'RSA';
                    postData['paySign'] = paySign;
                    callBack(postData);
                }
                return;
            }
            callBack(err || response.body || response.statusCode);
        })
    },
    wxPayCallBackAES: function (params, callBack) {
        // let body = JSON.parse(params);
        let body = params;
        const ciphertext = body.resource.ciphertext;
        const nonce = body.resource.nonce;
        const associated_data = body.resource.associated_data;
        // 解密
        let data = JSON.parse(decodeByAES(ciphertext, _plugin.v3ApiKey, nonce, associated_data));
        // data.attach = JSON.parse(decodeURIComponent(data.attach));
        data.success_time = decodeURIComponent(data.success_time.replace(/\+/g, '%20').replace(/T/g, ' '));
        if (callBack) {
            callBack(data);
        }
    },
    wxPayGetOrder: function (params, callBack) { // 测试未接通，
        let ts = getTimeStamp();
        let nonce_str = getUUID();
        let msg = joinMessage("GET", `/v3/pay/transactions/out-trade-no/${ params.out_trade_no }?mchid=${ _plugin.mchid }`, ts, nonce_str);
        let signature = calcSign(msg);
        let auth = `WECHATPAY2-SHA256-RSA2048 mchid="${_plugin.mchid}",nonce_str="${nonce_str}",signature="${signature}",timestamp="${ts}",serial_no="${_plugin.serial_no}"`
        axios({url: _plugin.mchApi + `v3/pay/transactions/out-trade-no/${ params.out_trade_no }?mchid=${ _plugin.mchid }`, method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0',
                Authorization: auth
            },
            json: true
        }, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                callBack(body);
                return;
            }
            callBack(err || response.body || response.statusCode);
        })
    }
}