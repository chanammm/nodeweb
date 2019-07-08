const mongoose = require('mongoose');

var aop = new mongoose.Schema({
    uri: String,
    async: String,
    phone: String,
    data: String
})

module.exports = mongoose.model('aop', aop, 'aop')