"use strict";
module.exports.trans = {
    toUnderLine: function (str) {
        let nstr = str.replace(/[A-Z]/g, function($0){
            //第一个参数返回正则表达式//内所匹配到的所有文本
            return '_' + $0.toLocaleLowerCase();
        })
        // 预防第一个出现大写
        if (nstr.slice(0, 1) == '_') {
            nstr = nstr.slice(1);
        };
        return nstr;
    },
    toUpperCase: function(str) {
        // 匹配一个或者多个下划线 + 后一个不是以下划线开头字符
        let nstr = str.replace(/(?:_)+([^_])/g, function ($0, $1) {
            return $1.toUpperCase();
        });
        nstr = nstr.replace(nstr[0], nstr[0].toLowerCase());
        return nstr;
    },
    random: function (length) {
        // 生成随机字符串
        length || (length = 16); //指定长度或者默认 8
        const numbers = '0123456789' + new Date().getTime();
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let total = '';
            total += numbers + letters;
        let result = '';
        console.log(total);
        // 从合并的字符串里面随机取值
        while (length > 0) {
            length--;
            result += total[Math.floor(Math.random() * total.length)];
        }
        return result;
    }
}