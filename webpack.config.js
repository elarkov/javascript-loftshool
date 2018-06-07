let webpack = require('webpack');
let HtmlPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let rules = require('./webpack.config.rules')();
let path = require('path');

rules.push({
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
  })
});

rules.push({
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader?url=false', 'sass-loader']
  })
});


module.exports = {
  entry: {
    index: './src/index.js'
  },
  devServer: {
    index: 'index.html'
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve('dist')
  },
  devtool: 'source-map',
  module: { rules },
  plugins: [
      new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
              drop_debugger: false,
              warnings: false
          }
      }),
      new ExtractTextPlugin('./css/styles.css'),
      new HtmlPlugin({
          title: 'Геоотзыв',
          template: 'index.hbs',
          filename: 'index.html',
          chunks: ['index']
      }),
      new CleanWebpackPlugin(['dist'])
  ]
};
