const requestFn = require('request');
var fs = require('fs')

module.exports.fs = { 
    get: function (req, res, next) {
        fs.writeFile('./product-1.html', '<html><div>123131231312313dddddddddddddddddddddddddddddddddddddddddddddddddd<div></html>', (err) => {
            if (err) {
                res.send({
                    code: 4004
                });
            } else {
                res.send({
                    code: 2002
                });
            }
        })
    }
}