var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var appVersion = require('../../backend/config/appVersion');



var DEV_HOST = process.env.DEV_HOST ? process.env.DEV_HOST : 'localhost';
var __API_HOST__ = 'http:192.168.2.222:2223';//方便去访问别人的主机调试代码
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
  devtool: false,
  entry: './src/index.js',
  output: {
    filename: `[name]-${appVersion.version}.js`,
    publicPath: __PUBLIC_PATH__,
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
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.html$/, loader: "handlebars" }
    ]
  }, plugins: [
    // new HtmlWebpackPlugin({  // 自动产生一个html文件,但是我们现在已经用不到它,放在这里仅仅为了看看运作方式
    //   filename: 'index.html',
    //   template: './templateHtml/index.html',
    //   title: 'MyBlog',
    //   describe: 'Welcome To MyBlog',
    //   inject: 'body'
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __APP_ENV__: JSON.stringify('production'),
      __STATE_VER__: JSON.stringify(appVersion.version),//状态树版本跟着app版本走
      __PUBLIC_PATH__: JSON.stringify(__PUBLIC_PATH__),
      __API_HOST__: JSON.stringify(__API_HOST__)
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
  ]
};