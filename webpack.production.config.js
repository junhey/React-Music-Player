'use strict';
const webpack = require('webpack');
const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry :[
		// 这里是你的入口文件
		'./app/index.js'
	],
	output:{
        path : path.resolve(__dirname , './dist'),
        filename: '[name]-[hash].min.js',
		filename:'bundle.js',
	},
	module:{
		rules:[{
			test:/\.js$/,
			exclude:/node_modules/,
			loader:"babel-loader",
			options : {
				presets:["react","es2015"]
			},
		},{
			test:/\.less$/,
			exclude:/node_modules/,
			use:[{
				loader:'style-loader'
			},{
				loader:'css-loader'
			},{
				loader:'less-loader'
			}]
		}]
	},
	plugins: [
		/*html-webpack-plugin插件*/
		new HtmlWebpackPlugin({
			template: './index.html',
			inject :'body',
			filename:'./index.html'
		}),
        new webpack.HotModuleReplacementPlugin(),
        // handles uglifying js
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        // plugin for passing in data to the js, like what NODE_ENV we are in.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
	]
}