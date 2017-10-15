var webpack = require("webpack");
var path = require("path");

var dev = path.resolve(__dirname,"dev");
var output = path.resolve(__dirname,"dist");

var config = {
    entry: dev + '/index.js',
    output: {
        path: output,
        filename: "calculator-bundle.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {   test: /\.jsx?$/, // 文件过滤规则
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'] // es2015 处理 ES6 语法，react 处理 jsx 语法
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            }
        ],

    }
};

module.exports = config;
