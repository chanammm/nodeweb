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