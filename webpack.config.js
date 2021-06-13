var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.join(__dirname, 'src');
const VENDOR_LIBS = [
    'react', 'react-dom', 'react-router-dom'
]
var htmlWebpackPlugin = require('html-webpack-plugin')
var config = {
    //entry: APP_DIR + '/index.js',
    entry : {
        bundle: APP_DIR + '/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].[hash].js'
    },
    module : {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // include: APP_DIR,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'file-loader'
            }
        ]
    },
    devServer : {
        contentBase: BUILD_DIR,
        compress: true,
        port: 9000,
        disableHostCheck: false,
        headers: {
            'X-Custom-header': "custom"
        },
        hot: true,
        historyApiFallback: true,
    },
    'plugins': [
                new htmlWebpackPlugin({
                template: 'index.html'
}),
new webpack.HotModuleReplacementPlugin(),
new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})
],
    
optimization: {
    splitChunks: {
        chunks: 'all'
    }
},
}

module.exports = config;