const mongoose = require('mongoose');

var uri = new mongoose.Schema({
    uri: String,
    newUri: String,
    time: String,
    key: String
})

module.exports = mongoose.model('uri', uri, 'uri')