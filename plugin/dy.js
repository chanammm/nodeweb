const requestFn = require('request');
module.exports.dyms = {
    post: function (req, res, next) {
        console.log(req.body)
        res.send(req.body.content) // 回应 challenge 给抖音 过验证
    }
}


// 20220914
