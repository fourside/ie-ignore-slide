const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    rules: [
      { test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          }
        ]}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new CopyWebpackPlugin([
      { from: './src/style.css', to: './' }
    ])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
