var pdf2png = require("../public/lib/pdf2png.js");
var fs = require("fs");

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
    post:function(req, res, next){
        console.log(req.body);

        // 处理pdf 程序
        var projectPath = __dirname.split("\\");
        projectPath.pop();
        projectPath = projectPath.join("\\");

        var gsPath = projectPath + "\\executables\\ghostScript";

        // Rewrite the ghostscript path
        pdf2png.ghostscriptPath = gsPath;

        // Most simple example
        // pdf2png.convert(__dirname + "/upload/"+ req.body.msg.filename, function(resp){
        pdf2png.convert("/usr/local/www/aptch-80/upload/"+ req.body.msg.filename, function(resp){

            if(!resp.success){
                console.log("Something went wrong: " + resp.error);
                
                return;
            }
            fs.writeFile("test/"+resp.imgNum+".png", resp.data, function(err) {
                if(err) {
                    console.log(err);
                }
            });
        });

        res.send({code: 0})
    }
}