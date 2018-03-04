const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: {
    app: './src/',
  },
  module: {
    loaders:[
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins:[
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    HtmlWebpackPluginConfig,
  ],
  resolve: {
      extensions: ['.js', '.jsx', '.scss']
  },
}
