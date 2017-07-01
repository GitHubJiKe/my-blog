var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');




var DEV_HOST = process.env.DEV_HOST ? process.env.DEV_HOST : 'localhost';
var __API_HOST__ = 'http://localhost:2223';//方便去访问别人的主机调试代码
var __PUBLIC_PATH__ = '';//for local
if (process.env.API_HOST) {
  __API_HOST__ = 'http://' + process.env.API_HOST;
}
if (process.env.PUBLIC_PATH) {
  __PUBLIC_PATH__ = 'http://' + process.env.PUBLIC_PATH;
} else {
  __PUBLIC_PATH__ = __API_HOST__;//不指定PUBLIC_PATH的话,默认和API_HOST一样
}
var webpack = require('webpack');
module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://' + DEV_HOST + ':4000',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: require('path').join(__dirname, '../../backend/public/'),
  },
  module: {
    loaders: [
      //处理js文件的loader配置
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'file-loader?limit=50000&name=[path][name].[ext]'
      },
      //处理css文件的loader配置
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }, plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      __APP_ENV__: JSON.stringify('dev'),
      __STATE_VER__: JSON.stringify('4'),
      __PUBLIC_PATH__: JSON.stringify(__PUBLIC_PATH__),
      __API_HOST__: JSON.stringify(__API_HOST__)
    })
  ]
};