const mongoose = require('mongoose');

var _status = new mongoose.Schema({
    status: String
})

module.exports = mongoose.model('state', _status, 'state');