var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var APP_ENV = process.env.APP_ENV;
var DEV_HOST = process.env.DEV_HOST ? process.env.DEV_HOST : 'localhost';
console.log('the APP_ENV:'+APP_ENV);
console.log('the DEV_IP:'+DEV_HOST);
// if(APP_ENV=='prod'){
var config = require('./webpack.config');
// }else{
//   var config = require('./webpack.config.dev');
// }


new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(2223, DEV_HOST, function (err) {
  if (err) console.log(err);
  console.log('Listening at '+DEV_HOST+':2223');
});