var pdf2png = require("../public/lib/pdf2png.js");
var fs = require("fs");
var md5  = require('js-md5')

module.exports.upload = {
    get: function (req, res, next){
        res.render('upload',{
			follow:{
				age:18
			}
		})
    },
    post:function(req,res,next){
        res.send({code: 0, msg: req.file});
    },

    put:function(req,res,next){
		console.log(req.body);
        req.on('data', function( data ){
            console.log(data);
        });
        
        res.send({code: 1});

    },
};

module.exports.devpdf = {
    post:function (req, res, next){
        console.log(req.body.hashName);

        // 处理pdf 程序
        var projectPath = __dirname.split("\\");
        projectPath.pop();
        projectPath = projectPath.join("\\");

        var gsPath = projectPath + "\\executables\\ghostScript";
        console.log(gsPath)

        gsPath = '\\usr\\local\\src\\parage\\ghostscript-9.25\\bin';

        // Rewrite the ghostscript path
        // pdf2png.ghostscriptPath = gsPath;

        console.log(pdf2png.ghostscriptPath)

        function unqrcode (str) {  // 加密文件名
            let res = []
            for (let i = 0; i < str.length; i++) {
                res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4)
            }
            return '\\u' + res.join('\\u')
        }
        // Most simple example
        // pdf2png.convert(__dirname + "/upload/"+ req.body.msg.filename, function(resp){
        fs.mkdir(`/usr/local/src/www/aptch-8099/80/public/pdfImage/${md5(unqrcode(req.body.hashName)).substring(8, 24)}`, function(err) {
            if(err){
                return false
            }
        })
        pdf2png.convert(req.body.hash, function(resp){

            if(!resp.success){
                console.log("Something went wrong: " + resp.error);
                return;
            }
            fs.writeFile(`/usr/local/src/www/aptch-8099/80/public/pdfImage/${md5(unqrcode(req.body.hashName)).substring(8, 24)}/${resp.imgNum}.jpg`, resp.data, function(err) {
                if(err) {
                    console.log(err);
                }
            });

        })

        fs.readdir( `/usr/local/src/www/aptch-8099/80/public/pdfImage/${md5(unqrcode(req.body.hashName)).substring(8, 24)}` , (err, files) => {
            console.log(err)
            console.log(files.length)
            res.send({code: 1, hashLength: files.length, hashName: md5(unqrcode(req.body.hashName)).substring(8, 24)});
        });
    }
}

module.exports.memo = {
    post: function (req, res, next){
        function unqrcode (str) {  // 加密文件名
            let res = []
            for (let i = 0; i < str.length; i++) {
                res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4)
            }
            return '\\u' + res.join('\\u')
        }
        fs.readdir( `/usr/local/src/www/aptch-8099/80/public/pdfImage/${md5(unqrcode(req.body.hashName)).substring(8, 24)}` , (err, files) => {
            if(err) {
                res.send(err)
                return 
            }
            res.send({code: 2, hashLength: files.length, hashName: md5(unqrcode(req.body.hashName)).substring(8, 24)});
        });
    }
}