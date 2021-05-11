const nodemailer = require("nodemailer"); //发送邮件的node插件
const ejs = require("ejs"); //ejs模版引擎
const fs = require("fs"); //文件读写
const path = require("path"); //路径配置

//发送者邮箱厂家
let EmianService = "qq";
//发送者邮箱账户SMTP授权码
let EamilAuth = {
  user: "cnzmg@qq.com",
  pass: "gelmsgxnmxwpbfge"
};
//发送者昵称与邮箱地址
let EmailFrom = '"Cnzmg" <cnzmg@qq.com>';

//接收者邮箱地
let EmailTo = "labuy@foxmail.com";
//邮件主题
let EmailSubject = "大猪蹄子前来资讯....";

module.exports.mail = {
    post:function(req,res,next){

        let HtmlData = req.body;
        
        const template = ejs.compile(
            fs.readFileSync(path.resolve(__dirname, "mail.ejs"), "utf8")
          );
        const html = template(HtmlData);
        
        let transporter = nodemailer.createTransport({
            service: EmianService,
            port: 465,
            secureConnection: true,
            auth: EamilAuth
        });
    
        let mailOptions = {
            from: EmailFrom,
            to: EmailTo,
            subject: EmailSubject,
            html: html
        };
        let num = 2;
        transporter.sendMail(mailOptions, (error, info={}) => {
            if (error) {
                console.log(error);
                if (num > 1) {
                    res.send({code: 400, error});
                }
                num++;
                sendMail(HtmlData); //再次发送
            }
            res.send({code: 0, error: 'successfull ~'});
        });
    }
};