const fs = require("fs");
const AlipaySdk = require('alipay-sdk').default;
/*
* 大正咖啡集团支付商户号资料信息
*/
const alipaySdk = new AlipaySdk({
    appId: '2021003180603535',
    privateKey: fs.readFileSync(__dirname + '/certs/ali_private_key.pem', 'ascii'),
    alipayPublicKey: fs.readFileSync(__dirname + '/certs/ali_public_key.pem', 'ascii'),
});
// (async () => {
//     await alipaySdk.exec('alipay.trade.query', {
//         bizContent: {
//           out_trade_no: '70501111111S001111119'
//         }
//       })
//       .then((params) => {
//           console.log(params)
//       })
// })();
module.exports.ali = {
    pay: async function (data, callBack) {
        await alipaySdk.exec('alipay.trade.wap.pay', {
            notify_url: 'https://interface.coffeedz.cn/pay.api.conf/aliPayCallback', // 通知回调地址
            return_url: `https://www.coffeedz.cn/anchor/ec/${ data._id }.html`, // 支付完成跳转回业务页面
            bizContent: {
              out_trade_no: (data._id.toString()).toUpperCase(),
              total_amount: parseFloat(parseInt(data.order_money) / 100).toFixed(2),
              subject: data.client_name,
            //   out_trade_no: '70501111111S001111112',
            //   total_amount: '0.01',
            //   subject: '测试订单',
              product_code: 'QUICK_WAP_WAY'
            }
          })
          .then((params) => {
            callBack(params);
          })
          .catch((err) => {
            callBack(err);
          });
    },
    query: async function (data, callBack) {
        await alipaySdk.exec('alipay.trade.query', {
            bizContent: {
              out_trade_no: data._id
            }
          })
          .then((params) => {
              console.log(params);
              callBack(params);
          })
          .catch((err) => {
            console.log(err);
            callBack(err);
          });
    }
}