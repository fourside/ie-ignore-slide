const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new CopyWebpackPlugin([
      { from: './src/style.css', to: './' }
    ])
  ]
};
