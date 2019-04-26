let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');   //需求执行安装模块

module.exports = {
    devServer:{
        port:3000,
        progress: true,
        contentBase: './build',
        compress: true
    },
    mode: '', //默认模式有两种 production development
    entry:'',
    output:{
        filename:'',
        path：path.resolve(__dirname, 'dist')  //必须是绝对路径
    },
    plugins:[   //所有的webpack插件
        new HtmlWebpackPlugin({
            template: './html.html',
            filename: 'index.html',
            minify:{
                removeAttributeQuotes: true,  //去除html 双引号
                collapseWhitespace: true
            },
            hash: true,  //引入文件后面加哈希值
        })
    ],
    module:{
        //模块
        rules:[
            //规则  css-loader 接续 @import 这种语法的
            //style-loader 他是把css插入到head 中
            //loader的特点，希望单一
            //loader的用法 字符串只用一个loader
            //多个loader 需要用数组
            { test: /\.css$/, use: ['css-loader']}
        ]
    }
}
