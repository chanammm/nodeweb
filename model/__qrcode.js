const mongoose = require('mongoose');

var _qrcode = new mongoose.Schema({
    url: String
})

module.exports = mongoose.model('qrcode', _qrcode, 'qrcode');