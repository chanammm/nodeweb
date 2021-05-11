var mongoose = require('mongoose');

var userProfessional = new mongoose.Schema({
    phone: String,
	email: String,
    pwd:String,
    time: String,
    loginTime: String
});

module.exports = mongoose.model('userProfessional', userProfessional);