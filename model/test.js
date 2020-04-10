const mongoose = require('mongoose');

var test = new mongoose.Schema({
    uri: String,
    async: String,
    phone: String,
    data: String
})

module.exports = mongoose.model('test', test, 'test')