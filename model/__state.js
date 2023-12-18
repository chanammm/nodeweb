const mongoose = require('mongoose');

var _status = new mongoose.Schema({
    status: Boolean,
    timer: String
})

module.exports = mongoose.model('state', _status, 'state');