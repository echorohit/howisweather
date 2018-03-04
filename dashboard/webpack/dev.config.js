const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSassDev = new ExtractTextPlugin({
    filename: "bundle.css"
});

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    contentBase: 'src',
    port: '3000',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader') }
    ]
  },
  plugins:[extractSassDev]
})
