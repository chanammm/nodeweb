const mongoose = require('mongoose');

var _xml = new mongoose.Schema({
    Question_1 : String,
    Question_2 : String,
    Question_3 : String,
    Question_4 : String,
    Question_5 : String,
    Question_6 : String,
    Question_7 : String,
    Question_8 : String,
    Question_9 : String,
    Question_10 : String,
    Question_11 : String,
    Question_12 : String,
    Question_13 : String,
    Question_14 : String,
    Question_15 : String,
    YmUserId: String,
    YmUserToken: String,
    DataTime: String
})

module.exports = mongoose.model('questionnaire', _xml, 'questionnaire');